"""Database models and connection using SQLAlchemy with pgvector."""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import String, Text, Integer, DateTime, ForeignKey, func, text
from pgvector.sqlalchemy import Vector
from datetime import datetime
from uuid import UUID, uuid4
from typing import List

from .config import get_settings

settings = get_settings()

# Convert database URL to async format
database_url = settings.database_url.replace("postgresql://", "postgresql+asyncpg://")
# Remove channel_binding parameter as asyncpg doesn't support it
if "&channel_binding=" in database_url:
    database_url = database_url.split("&channel_binding=")[0]

engine = create_async_engine(database_url, echo=settings.debug)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    """Base class for all models."""
    pass


class Document(Base):
    """Stores uploaded documents metadata."""
    
    __tablename__ = "documents"
    
    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    content_type: Mapped[str | None] = mapped_column(String(100))
    file_size: Mapped[int | None] = mapped_column(Integer)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    
    # Relationship to chunks - cascade delete
    chunks: Mapped[List["Chunk"]] = relationship(
        "Chunk", 
        back_populates="document", 
        cascade="all, delete-orphan"
    )


class Chunk(Base):
    """Stores document chunks with vector embeddings."""
    
    __tablename__ = "chunks"
    
    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    document_id: Mapped[UUID] = mapped_column(ForeignKey("documents.id", ondelete="CASCADE"))
    content: Mapped[str] = mapped_column(Text, nullable=False)
    embedding = mapped_column(Vector(384))  # 384 dimensions for all-MiniLM-L6-v2
    chunk_index: Mapped[int | None] = mapped_column(Integer)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    
    # Relationship to document
    document: Mapped["Document"] = relationship("Document", back_populates="chunks")


async def get_db():
    """Dependency for getting database session."""
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()


async def init_db():
    """Initialize database tables (creates if not exist)."""
    async with engine.begin() as conn:
        # Create pgvector extension if not exists
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        # Create all tables (only if they don't exist)
        await conn.run_sync(Base.metadata.create_all)
        print("✅ Database initialized")
