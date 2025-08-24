# main.py
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.dialects.postgresql import ARRAY
import asyncpg
import asyncio
from datetime import datetime
import os
import uuid
import PyPDF2
import io
from typing import List, Optional
from openai import OpenAI
from pydantic import BaseModel
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import json
import logging

# Configuration
DATABASE_URL = os.getenv("DATABASE_URL")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
try:
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
except TypeError as e:
    import inspect
    print("DEBUG: OpenAI init signature:", inspect.signature(OpenAI.__init__))
    raise

# Database setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)
    file_size = Column(Integer)

class DocumentChunk(Base):
    __tablename__ = "document_chunks"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, nullable=False)
    chunk_text = Column(Text, nullable=False)
    chunk_index = Column(Integer, nullable=False)
    embedding = Column(ARRAY(Float), nullable=True)

class ChatHistory(Base):
    __tablename__ = "chat_history"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, nullable=False)
    user_message = Column(Text, nullable=False)
    bot_response = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI(title="RAG Chatbot System", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Templates and static files
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class QueryRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class QueryResponse(BaseModel):
    response: str
    session_id: str
    sources: List[str] = []

class DocumentResponse(BaseModel):
    id: int
    filename: str
    upload_date: datetime
    file_size: int

# Utility functions
def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text from PDF file"""
    try:
        pdf_file = io.BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error extracting text from PDF: {str(e)}")

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
    """Split text into overlapping chunks"""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start = end - overlap
        if start >= len(text):
            break
    return chunks

async def get_embedding(text: str) -> List[float]:
    """Get embedding for text using OpenAI API"""
    try:
        response = await asyncio.to_thread(
            openai_client.embeddings.create,
            model="text-embedding-ada-002",
            input=text
        )
        return response.data[0].embedding
    except Exception as e:
        logging.error(f"Error getting embedding: {str(e)}")
        return []

async def find_similar_chunks(query: str, db: Session, top_k: int = 5) -> List[tuple]:
    """Find most similar chunks to query"""
    query_embedding = await get_embedding(query)
    if not query_embedding:
        return []
    
    # Get all chunks with embeddings
    chunks = db.query(DocumentChunk).filter(DocumentChunk.embedding.isnot(None)).all()
    
    if not chunks:
        return []
    
    similarities = []
    for chunk in chunks:
        if chunk.embedding:
            similarity = cosine_similarity([query_embedding], [chunk.embedding])[0][0]
            similarities.append((chunk, similarity))
    
    # Sort by similarity and return top k
    similarities.sort(key=lambda x: x[1], reverse=True)
    return similarities[:top_k]

async def generate_response(query: str, context: str, chat_history: List = None) -> str:
    """Generate response using OpenAI GPT"""
    try:
        system_message = """You are a helpful AI assistant that answers questions based on the provided context about a specific person. 
        Use the context to provide accurate and helpful responses. If the context doesn't contain relevant information, 
        politely say so and ask for more specific questions. Always be conversational and helpful and never answer out of context question."""
        
        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": f"Context: {context}\n\nQuestion: {query}"}
        ]
        
        # Add chat history if provided
        if chat_history:
            for chat in chat_history[-5:]:  # Last 5 messages for context
                messages.insert(-1, {"role": "user", "content": chat.user_message})
                messages.insert(-1, {"role": "assistant", "content": chat.bot_response})
        
        response = await asyncio.to_thread(
            openai_client.chat.completions.create,
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
        
        return response.choices[0].message.content
    except Exception as e:
        logging.error(f"Error generating response: {str(e)}")
        return "I apologize, but I'm having trouble generating a response right now. Please try again."

# API Routes

@app.get("/", response_class=HTMLResponse)
async def home():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>RAG Chatbot System</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .nav { display: flex; gap: 20px; margin-bottom: 30px; }
            .nav a { padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
            .nav a:hover { background: #0056b3; }
            h1 { color: #333; text-align: center; margin-bottom: 30px; }
            .feature { margin: 20px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #007bff; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>RAG Chatbot System</h1>
            <div class="nav">
                <a href="/admin">Admin Panel</a>
                <a href="/chat">Chat Interface</a>
                <a href="/docs">API Documentation</a>
            </div>
            <div class="feature">
                <h3>🔧 Admin Panel</h3>
                <p>Upload PDF documents to build your knowledge base</p>
            </div>
            <div class="feature">
                <h3>💬 Chat Interface</h3>
                <p>Interactive chatbot that answers questions based on uploaded documents</p>
            </div>
            <div class="feature">
                <h3>🚀 Features</h3>
                <p>• PDF document processing • Vector embeddings • Semantic search • OpenAI integration</p>
            </div>
        </div>
    </body>
    </html>
    """

@app.get("/admin", response_class=HTMLResponse)
async def admin_panel():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin Panel - RAG Chatbot</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .container { max-width: 1000px; margin: 0 auto; }
            .header { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .upload-section, .documents-section { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .upload-form { display: flex; flex-direction: column; gap: 15px; }
            .file-input { padding: 10px; border: 2px dashed #ddd; border-radius: 5px; text-align: center; }
            .upload-btn { padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
            .upload-btn:hover { background: #218838; }
            .upload-btn:disabled { background: #6c757d; cursor: not-allowed; }
            .documents-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .documents-table th, .documents-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            .documents-table th { background: #f8f9fa; font-weight: bold; }
            .delete-btn { padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer; }
            .delete-btn:hover { background: #c82333; }
            .status { padding: 10px; margin: 10px 0; border-radius: 5px; }
            .status.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .status.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
            .nav { margin-bottom: 20px; }
            .nav a { padding: 10px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="nav">
                <a href="/">Home</a>
                <a href="/chat">Chat Interface</a>
            </div>
            
            <div class="header">
                <h1>Admin Panel</h1>
                <p>Upload PDF documents to build your knowledge base</p>
            </div>

            <div class="upload-section">
                <h2>Upload Document</h2>
                <form id="uploadForm" class="upload-form">
                    <div class="file-input">
                        <input type="file" id="fileInput" accept=".pdf" required>
                        <p>Choose a PDF file to upload</p>
                    </div>
                    <button type="submit" class="upload-btn" id="uploadBtn">Upload Document</button>
                </form>
                <div id="status"></div>
            </div>

            <div class="documents-section">
                <h2>Uploaded Documents</h2>
                <button onclick="loadDocuments()" style="margin-bottom: 15px; padding: 8px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer;">Refresh List</button>
                <div id="documentsContainer">
                    <p>Loading documents...</p>
                </div>
            </div>
        </div>

        <script>
            // Upload form handling
            document.getElementById('uploadForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const fileInput = document.getElementById('fileInput');
                const uploadBtn = document.getElementById('uploadBtn');
                const statusDiv = document.getElementById('status');
                
                if (!fileInput.files[0]) {
                    showStatus('Please select a file', 'error');
                    return;
                }

                const formData = new FormData();
                formData.append('file', fileInput.files[0]);

                uploadBtn.disabled = true;
                uploadBtn.textContent = 'Uploading...';
                
                try {
                    const response = await fetch('/upload-document', {
                        method: 'POST',
                        body: formData
                    });
                    
                    if (response.ok) {
                        const result = await response.json();
                        showStatus('Document uploaded and processed successfully!', 'success');
                        fileInput.value = '';
                        loadDocuments();
                    } else {
                        const error = await response.json();
                        showStatus(`Error: ${error.detail}`, 'error');
                    }
                } catch (error) {
                    showStatus(`Error: ${error.message}`, 'error');
                } finally {
                    uploadBtn.disabled = false;
                    uploadBtn.textContent = 'Upload Document';
                }
            });

            // Load documents
            async function loadDocuments() {
                const container = document.getElementById('documentsContainer');
                container.innerHTML = '<p>Loading documents...</p>';
                
                try {
                    const response = await fetch('/documents');
                    if (response.ok) {
                        const documents = await response.json();
                        displayDocuments(documents);
                    } else {
                        container.innerHTML = '<p>Error loading documents</p>';
                    }
                } catch (error) {
                    container.innerHTML = `<p>Error: ${error.message}</p>`;
                }
            }

            // Display documents
            function displayDocuments(documents) {
                const container = document.getElementById('documentsContainer');
                
                if (documents.length === 0) {
                    container.innerHTML = '<p>No documents uploaded yet.</p>';
                    return;
                }

                let html = `
                    <table class="documents-table">
                        <thead>
                            <tr>
                                <th>Filename</th>
                                <th>Upload Date</th>
                                <th>File Size</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                documents.forEach(doc => {
                    const date = new Date(doc.upload_date).toLocaleString();
                    const size = (doc.file_size / 1024).toFixed(1) + ' KB';
                    html += `
                        <tr>
                            <td>${doc.filename}</td>
                            <td>${date}</td>
                            <td>${size}</td>
                            <td>
                                <button class="delete-btn" onclick="deleteDocument(${doc.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                });

                html += '</tbody></table>';
                container.innerHTML = html;
            }

            // Delete document
            async function deleteDocument(docId) {
                if (!confirm('Are you sure you want to delete this document?')) return;
                
                try {
                    const response = await fetch(`/documents/${docId}`, {
                        method: 'DELETE'
                    });
                    
                    if (response.ok) {
                        showStatus('Document deleted successfully!', 'success');
                        loadDocuments();
                    } else {
                        const error = await response.json();
                        showStatus(`Error: ${error.detail}`, 'error');
                    }
                } catch (error) {
                    showStatus(`Error: ${error.message}`, 'error');
                }
            }

            // Show status message
            function showStatus(message, type) {
                const statusDiv = document.getElementById('status');
                statusDiv.innerHTML = `<div class="status ${type}">${message}</div>`;
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            }

            // Load documents on page load
            loadDocuments();
        </script>
    </body>
    </html>
    """

@app.get("/chat", response_class=HTMLResponse)
async def chat_interface():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Chat - RAG Chatbot</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; height: 100vh; display: flex; flex-direction: column; }
            .header { background: white; padding: 15px 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .nav a { padding: 8px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px; }
            .chat-container { flex: 1; display: flex; flex-direction: column; max-width: 800px; margin: 20px auto; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
            .chat-header { background: #007bff; color: white; padding: 15px; text-align: center; }
            .chat-messages { flex: 1; padding: 20px; overflow-y: auto; min-height: 400px; max-height: 500px; }
            .message { margin-bottom: 15px; padding: 12px; border-radius: 8px; max-width: 80%; }
            .user-message { background: #e3f2fd; margin-left: auto; }
            .bot-message { background: #f5f5f5; }
            .chat-input { display: flex; padding: 15px; border-top: 1px solid #ddd; }
            .chat-input input { flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 25px; margin-right: 10px; }
            .chat-input button { padding: 12px 20px; background: #007bff; color: white; border: none; border-radius: 25px; cursor: pointer; }
            .chat-input button:hover { background: #0056b3; }
            .chat-input button:disabled { background: #6c757d; cursor: not-allowed; }
            .typing { font-style: italic; color: #666; }
            .timestamp { font-size: 11px; color: #999; margin-top: 5px; }
            .sources { font-size: 12px; color: #666; margin-top: 8px; font-style: italic; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="nav">
                <a href="/">Home</a>
                <a href="/admin">Admin Panel</a>
            </div>
        </div>
        
        <div class="chat-container">
            <div class="chat-header">
                <h2>RAG Chatbot</h2>
                <p>Ask me anything about the uploaded documents!</p>
            </div>
            
            <div class="chat-messages" id="chatMessages">
                <div class="message bot-message">
                    <strong>Bot:</strong> Hello! I'm here to help you with questions about the uploaded documents. What would you like to know?
                    <div class="timestamp">${new Date().toLocaleTimeString()}</div>
                </div>
            </div>
            
            <div class="chat-input">
                <input type="text" id="messageInput" placeholder="Type your message here..." onkeypress="handleKeyPress(event)">
                <button onclick="sendMessage()" id="sendBtn">Send</button>
            </div>
        </div>

        <script>
            let sessionId = generateSessionId();
            
            function generateSessionId() {
                return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
            }

            function handleKeyPress(event) {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            }

            async function sendMessage() {
                const messageInput = document.getElementById('messageInput');
                const sendBtn = document.getElementById('sendBtn');
                const message = messageInput.value.trim();
                
                if (!message) return;

                // Add user message to chat
                addMessage(message, 'user');
                messageInput.value = '';
                sendBtn.disabled = true;
                sendBtn.textContent = 'Sending...';

                // Add typing indicator
                const typingId = addTypingIndicator();

                try {
                    const response = await fetch('/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            message: message,
                            session_id: sessionId
                        })
                    });

                    if (response.ok) {
                        const result = await response.json();
                        removeTypingIndicator(typingId);
                        addMessage(result.response, 'bot', result.sources);
                        sessionId = result.session_id;
                    } else {
                        const error = await response.json();
                        removeTypingIndicator(typingId);
                        addMessage(`Sorry, I encountered an error: ${error.detail}`, 'bot');
                    }
                } catch (error) {
                    removeTypingIndicator(typingId);
                    addMessage(`Sorry, I'm having trouble connecting. Please try again.`, 'bot');
                } finally {
                    sendBtn.disabled = false;
                    sendBtn.textContent = 'Send';
                }
            }

            function addMessage(message, type, sources = []) {
                const chatMessages = document.getElementById('chatMessages');
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${type}-message`;
                
                let sourcesHtml = '';
                if (sources && sources.length > 0) {
                    sourcesHtml = `<div class="sources">Sources: ${sources.join(', ')}</div>`;
                }
                
                messageDiv.innerHTML = `
                    <strong>${type === 'user' ? 'You' : 'Bot'}:</strong> ${message}
                    <div class="timestamp">${new Date().toLocaleTimeString()}</div>
                    ${sourcesHtml}
                `;
                
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function addTypingIndicator() {
                const chatMessages = document.getElementById('chatMessages');
                const typingDiv = document.createElement('div');
                const id = 'typing_' + Date.now();
                typingDiv.id = id;
                typingDiv.className = 'message bot-message typing';
                typingDiv.innerHTML = '<strong>Bot:</strong> Typing...';
                chatMessages.appendChild(typingDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                return id;
            }

            function removeTypingIndicator(id) {
                const typingDiv = document.getElementById(id);
                if (typingDiv) {
                    typingDiv.remove();
                }
            }
        </script>
    </body>
    </html>
    """

@app.post("/upload-document")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Upload and process a PDF document"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        # Read file content
        content = await file.read()
        
        # Extract text from PDF
        text = extract_text_from_pdf(content)
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="No text found in PDF")
        
        # Save document to database
        document = Document(
            filename=file.filename,
            content=text,
            file_size=len(content)
        )
        db.add(document)
        db.commit()
        db.refresh(document)
        
        # Process document into chunks
        chunks = chunk_text(text)
        
        # Generate embeddings for chunks
        for i, chunk in enumerate(chunks):
            embedding = await get_embedding(chunk)
            
            doc_chunk = DocumentChunk(
                document_id=document.id,
                chunk_text=chunk,
                chunk_index=i,
                embedding=embedding if embedding else None
            )
            db.add(doc_chunk)
        
        db.commit()
        
        return {"message": "Document uploaded and processed successfully", "document_id": document.id}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error processing document: {str(e)}")

@app.get("/documents", response_model=List[DocumentResponse])
async def get_documents(db: Session = Depends(get_db)):
    """Get list of all uploaded documents"""
    documents = db.query(Document).order_by(Document.upload_date.desc()).all()
    return documents

@app.delete("/documents/{document_id}")
async def delete_document(document_id: int, db: Session = Depends(get_db)):
    """Delete a document and its chunks"""
    try:
        # Delete document chunks
        db.query(DocumentChunk).filter(DocumentChunk.document_id == document_id).delete()
        
        # Delete document
        document = db.query(Document).filter(Document.id == document_id).first()
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        
        db.delete(document)
        db.commit()
        
        return {"message": "Document deleted successfully"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting document: {str(e)}")

@app.post("/chat", response_model=QueryResponse)
async def chat(request: QueryRequest, db: Session = Depends(get_db)):
    """Handle chat queries using RAG"""
    try:
        # Generate session ID if not provided
        session_id = request.session_id or str(uuid.uuid4())
        
        # Find similar chunks
        similar_chunks = await find_similar_chunks(request.message, db)
        
        if not similar_chunks:
            response_text = "I don't have any relevant information to answer your question. Please make sure documents have been uploaded to the knowledge base."
            sources = []
        else:
            # Build context from similar chunks
            context = "\n\n".join([chunk[0].chunk_text for chunk in similar_chunks[:3]])
            
            # Get chat history for context
            chat_history = db.query(ChatHistory).filter(
                ChatHistory.session_id == session_id
            ).order_by(ChatHistory.timestamp.desc()).limit(5).all()
            
            # Generate response
            response_text = await generate_response(request.message, context, chat_history)
            
            # Get source document filenames
            source_doc_ids = [chunk[0].document_id for chunk in similar_chunks[:3]]
            source_docs = db.query(Document).filter(Document.id.in_(source_doc_ids)).all()
            sources = [doc.filename for doc in source_docs]
        
        # Save chat history
        chat_entry = ChatHistory(
            session_id=session_id,
            user_message=request.message,
            bot_response=response_text
        )
        db.add(chat_entry)
        db.commit()
        
        return QueryResponse(
            response=response_text,
            session_id=session_id,
            sources=sources
        )
        
    except Exception as e:
        logging.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)




