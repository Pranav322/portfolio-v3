"""Chat routes for RAG-powered conversations."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text
from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID

from ..database import get_db, Chunk, Document
from ..embeddings import generate_embedding
from ..llm import generate_response

router = APIRouter(tags=["chat"])


class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    chat_history: Optional[List[ChatMessage]] = None


class SourceChunk(BaseModel):
    document_id: UUID
    document_name: str
    content: str
    similarity: float


class ChatResponse(BaseModel):
    response: str
    sources: List[SourceChunk]


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    """
    Send a message and get a RAG-powered response.
    
    - Generates embedding for the query
    - Searches for similar chunks using pgvector
    - Generates response using Azure OpenAI with context
    - Returns response with source citations
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    # Generate embedding for the query
    query_embedding = generate_embedding(request.message)
    
    # Format embedding as PostgreSQL array literal
    embedding_str = "[" + ",".join(str(x) for x in query_embedding) + "]"
    
    # Search for similar chunks using pgvector cosine similarity
    # Using raw SQL for the vector similarity search
    similarity_query = text(f"""
        SELECT 
            c.id,
            c.document_id,
            c.content,
            d.filename,
            1 - (c.embedding <=> '{embedding_str}'::vector) as similarity
        FROM chunks c
        JOIN documents d ON c.document_id = d.id
        ORDER BY c.embedding <=> '{embedding_str}'::vector
        LIMIT 5
    """)
    
    result = await db.execute(similarity_query)
    rows = result.fetchall()
    
    if not rows:
        return ChatResponse(
            response="I don't have any documents in my knowledge base yet. Please upload some documents first.",
            sources=[]
        )
    
    # Build context from retrieved chunks
    context_parts = []
    sources = []
    
    for row in rows:
        chunk_id, doc_id, content, filename, similarity = row
        
        # Only include chunks with reasonable similarity
        if similarity > 0.3:
            context_parts.append(f"[From: {filename}]\n{content}")
            sources.append(SourceChunk(
                document_id=doc_id,
                document_name=filename,
                content=content[:200] + "..." if len(content) > 200 else content,
                similarity=round(similarity, 3)
            ))
    
    if not context_parts:
        return ChatResponse(
            response="I couldn't find relevant information to answer your question in my knowledge base.",
            sources=[]
        )
    
    context = "\n\n---\n\n".join(context_parts)
    
    # Convert chat history to the format expected by LLM
    chat_history = None
    if request.chat_history:
        chat_history = [
            {"role": msg.role, "content": msg.content}
            for msg in request.chat_history
        ]
    
    # Generate response using LLM
    response = await generate_response(
        query=request.message,
        context=context,
        chat_history=chat_history,
    )
    
    return ChatResponse(
        response=response,
        sources=sources
    )
