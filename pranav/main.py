"""
Pranav AI - RAG Chatbot Backend

A FastAPI-based chatbot that uses Retrieval Augmented Generation (RAG)
with Azure OpenAI and PostgreSQL pgvector for semantic search.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from src.database import init_db
from src.routes.admin import router as admin_router
from src.routes.chat import router as chat_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize database on startup."""
    print("🚀 Starting Pranav AI Backend...")
    await init_db()
    print("✅ Database initialized")
    yield
    print("👋 Shutting down...")


app = FastAPI(
    title="Pranav AI",
    description="RAG-powered chatbot backend for portfolio",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(admin_router)
app.include_router(chat_router)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "name": "Pranav AI",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}
