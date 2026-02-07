"""Local embeddings using sentence-transformers."""

from sentence_transformers import SentenceTransformer
from functools import lru_cache
from typing import List

from .config import get_settings

settings = get_settings()


@lru_cache()
def get_embedding_model() -> SentenceTransformer:
    """Get cached embedding model instance."""
    return SentenceTransformer(settings.embedding_model)


def generate_embedding(text: str) -> List[float]:
    """Generate embedding for a single text."""
    model = get_embedding_model()
    embedding = model.encode(text, convert_to_numpy=True)
    return embedding.tolist()


def generate_embeddings(texts: List[str]) -> List[List[float]]:
    """Generate embeddings for multiple texts (batch processing)."""
    model = get_embedding_model()
    embeddings = model.encode(texts, convert_to_numpy=True, show_progress_bar=True)
    return embeddings.tolist()


def chunk_text(text: str, chunk_size: int = 1000, chunk_overlap: int = 200) -> List[str]:
    """
    Split text into overlapping chunks.
    
    Args:
        text: Text to split
        chunk_size: Maximum characters per chunk
        chunk_overlap: Overlap between chunks
    
    Returns:
        List of text chunks
    """
    if len(text) <= chunk_size:
        return [text]
    
    chunks = []
    start = 0
    
    while start < len(text):
        end = start + chunk_size
        
        # Try to break at a sentence or paragraph boundary
        if end < len(text):
            # Look for paragraph break
            para_break = text.rfind('\n\n', start, end)
            if para_break > start + chunk_size // 2:
                end = para_break + 2
            else:
                # Look for sentence break
                for sep in ['. ', '! ', '? ', '\n']:
                    sent_break = text.rfind(sep, start, end)
                    if sent_break > start + chunk_size // 2:
                        end = sent_break + len(sep)
                        break
        
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        
        start = end - chunk_overlap
    
    return chunks
