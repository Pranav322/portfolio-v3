"""Admin routes for document management."""

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime
import io

from pypdf import PdfReader

from ..database import get_db, Document, Chunk
from ..embeddings import generate_embeddings, chunk_text

router = APIRouter(prefix="/admin", tags=["admin"])


# Response models
class DocumentResponse(BaseModel):
    id: UUID
    filename: str
    content_type: Optional[str]
    file_size: Optional[int]
    created_at: datetime
    chunk_count: Optional[int] = None
    
    class Config:
        from_attributes = True


class DocumentListResponse(BaseModel):
    documents: List[DocumentResponse]
    total: int


class UploadResponse(BaseModel):
    message: str
    document: DocumentResponse
    chunks_created: int


class DeleteResponse(BaseModel):
    message: str
    document_id: UUID
    chunks_deleted: int


def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text from PDF file."""
    pdf = PdfReader(io.BytesIO(file_content))
    text = ""
    for page in pdf.pages:
        text += page.extract_text() or ""
    return text


def extract_text_from_file(file_content: bytes, content_type: str, filename: str) -> str:
    """Extract text from uploaded file based on type."""
    if content_type == "application/pdf" or filename.endswith(".pdf"):
        return extract_text_from_pdf(file_content)
    elif content_type in ["text/plain", "text/markdown"] or filename.endswith((".txt", ".md")):
        return file_content.decode("utf-8")
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {content_type}. Supported: PDF, TXT, MD"
        )


@router.post("/documents", response_model=UploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    """
    Upload a document for RAG processing.
    
    - Extracts text from PDF, TXT, or MD files
    - Chunks the text into smaller pieces
    - Generates embeddings for each chunk
    - Stores everything in the database
    """
    # Read file content
    file_content = await file.read()
    file_size = len(file_content)
    
    # Extract text
    text = extract_text_from_file(file_content, file.content_type or "", file.filename or "")
    
    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract any text from the file")
    
    # Create document record
    document = Document(
        filename=file.filename or "unknown",
        content_type=file.content_type,
        file_size=file_size,
    )
    db.add(document)
    await db.flush()  # Get the document ID
    
    # Chunk the text
    chunks = chunk_text(text)
    
    # Generate embeddings for all chunks
    embeddings = generate_embeddings(chunks)
    
    # Create chunk records
    chunk_records = []
    for idx, (chunk_text_content, embedding) in enumerate(zip(chunks, embeddings)):
        chunk = Chunk(
            document_id=document.id,
            content=chunk_text_content,
            embedding=embedding,
            chunk_index=idx,
        )
        chunk_records.append(chunk)
    
    db.add_all(chunk_records)
    await db.commit()
    await db.refresh(document)
    
    return UploadResponse(
        message="Document uploaded and processed successfully",
        document=DocumentResponse(
            id=document.id,
            filename=document.filename,
            content_type=document.content_type,
            file_size=document.file_size,
            created_at=document.created_at,
            chunk_count=len(chunks),
        ),
        chunks_created=len(chunks),
    )


@router.get("/documents", response_model=DocumentListResponse)
async def list_documents(db: AsyncSession = Depends(get_db)):
    """List all uploaded documents with their chunk counts."""
    # Query documents with chunk count
    stmt = (
        select(
            Document,
            func.count(Chunk.id).label("chunk_count")
        )
        .outerjoin(Chunk)
        .group_by(Document.id)
        .order_by(Document.created_at.desc())
    )
    
    result = await db.execute(stmt)
    rows = result.all()
    
    documents = [
        DocumentResponse(
            id=doc.id,
            filename=doc.filename,
            content_type=doc.content_type,
            file_size=doc.file_size,
            created_at=doc.created_at,
            chunk_count=chunk_count,
        )
        for doc, chunk_count in rows
    ]
    
    return DocumentListResponse(documents=documents, total=len(documents))


@router.get("/documents/{document_id}", response_model=DocumentResponse)
async def get_document(document_id: UUID, db: AsyncSession = Depends(get_db)):
    """Get a specific document by ID."""
    stmt = (
        select(
            Document,
            func.count(Chunk.id).label("chunk_count")
        )
        .outerjoin(Chunk)
        .where(Document.id == document_id)
        .group_by(Document.id)
    )
    
    result = await db.execute(stmt)
    row = result.first()
    
    if not row:
        raise HTTPException(status_code=404, detail="Document not found")
    
    doc, chunk_count = row
    return DocumentResponse(
        id=doc.id,
        filename=doc.filename,
        content_type=doc.content_type,
        file_size=doc.file_size,
        created_at=doc.created_at,
        chunk_count=chunk_count,
    )


@router.delete("/documents/{document_id}", response_model=DeleteResponse)
async def delete_document(document_id: UUID, db: AsyncSession = Depends(get_db)):
    """
    Delete a document and all its chunks.
    
    Chunks are automatically deleted via CASCADE.
    """
    # Get document with chunk count first
    stmt = (
        select(
            Document,
            func.count(Chunk.id).label("chunk_count")
        )
        .outerjoin(Chunk)
        .where(Document.id == document_id)
        .group_by(Document.id)
    )
    
    result = await db.execute(stmt)
    row = result.first()
    
    if not row:
        raise HTTPException(status_code=404, detail="Document not found")
    
    doc, chunk_count = row
    
    # Delete document (chunks cascade automatically)
    await db.delete(doc)
    await db.commit()
    
    return DeleteResponse(
        message="Document and all chunks deleted successfully",
        document_id=document_id,
        chunks_deleted=chunk_count,
    )
