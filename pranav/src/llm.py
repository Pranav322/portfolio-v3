"""Azure OpenAI LLM for chat completion."""

from openai import AsyncAzureOpenAI
from typing import List, Optional
from functools import lru_cache

from .config import get_settings

settings = get_settings()


@lru_cache()
def get_llm_client() -> AsyncAzureOpenAI:
    """Get cached Azure OpenAI client."""
    return AsyncAzureOpenAI(
        api_key=settings.azure_openai_api_key,
        api_version=settings.azure_openai_api_version,
        azure_endpoint=settings.azure_openai_endpoint,
    )


SYSTEM_PROMPT = """You are Pranav AI, a helpful assistant that answers questions about Pranav based on the provided context.

**Rules:**
- Answer questions based ONLY on the provided context
- If the context doesn't contain relevant information, say "I don't have information about that in my knowledge base"
- Be concise and direct in your responses
- Use a friendly, professional tone
- When information comes from different documents (indicated by [From: filename]), clearly distinguish and attribute information to each source
- For example, if asked about skills and there are multiple resumes, say "According to backend_dev.pdf, Pranav knows X, Y, Z. According to flutter_dev.pdf, Pranav knows A, B, C."
- Always mention which document the information came from when relevant

**Context:**
{context}
"""


async def generate_response(
    query: str,
    context: str,
    chat_history: Optional[List[dict]] = None,
) -> str:
    """
    Generate a response using Azure OpenAI with RAG context.
    
    Args:
        query: User's question
        context: Retrieved context from vector search
        chat_history: Optional previous messages for conversation continuity
    
    Returns:
        AI-generated response
    """
    client = get_llm_client()
    
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT.format(context=context)}
    ]
    
    # Add chat history if provided
    if chat_history:
        for msg in chat_history[-5:]:  # Last 5 messages for context
            messages.append(msg)
    
    # Add current query
    messages.append({"role": "user", "content": query})
    
    response = await client.chat.completions.create(
        model=settings.azure_deployment_name,
        messages=messages,
        temperature=0.7,
        max_tokens=1000,
    )
    
    return response.choices[0].message.content
