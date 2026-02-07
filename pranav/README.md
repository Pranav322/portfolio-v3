# Pranav AI - RAG Chatbot Backend

A FastAPI-based chatbot that uses Retrieval Augmented Generation (RAG) with Azure OpenAI and PostgreSQL pgvector for semantic search.

## Tech Stack

- **Framework**: FastAPI
- **AI**: Azure OpenAI GPT-4.1
- **Embeddings**: sentence-transformers (all-MiniLM-L6-v2) - local, free
- **Database**: PostgreSQL with pgvector
- **Package Manager**: uv

## Setup

1. Install dependencies:

```bash
uv sync
```

2. Configure `.env`:

```env
AZURE_OPENAI_ENDPOINT=your-endpoint
AZURE_OPENAI_API_KEY=your-key
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_DEPLOYMENT_NAME=gpt-4.1
DATABASE_URL=postgresql://...
```

3. Run the server:

```bash
uv run uvicorn main:app --reload --port 8000
```

## API Endpoints

### Admin Routes

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| POST   | `/admin/documents`      | Upload document (PDF, TXT, MD) |
| GET    | `/admin/documents`      | List all documents             |
| GET    | `/admin/documents/{id}` | Get document details           |
| DELETE | `/admin/documents/{id}` | Delete document and chunks     |

### Chat Routes

| Method | Endpoint | Description                   |
| ------ | -------- | ----------------------------- |
| POST   | `/chat`  | Send message, get AI response |

## Architecture

```
User Query → Generate Embedding → pgvector Search → Retrieve Context → Azure OpenAI → Response
```

### Document Processing

1. Upload document (PDF/TXT/MD)
2. Extract text
3. Split into chunks (1000 chars, 200 overlap)
4. Generate embeddings for each chunk
5. Store in PostgreSQL with pgvector

### Chat Flow

1. User sends message
2. Generate embedding for query
3. Search similar chunks using cosine similarity
4. Build context from top 5 matches
5. Send to Azure OpenAI with system prompt
6. Return response with source citations
