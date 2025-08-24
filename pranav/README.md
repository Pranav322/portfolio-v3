# RAG Chatbot System

A comprehensive Retrieval-Augmented Generation (RAG) chatbot system built with FastAPI, PostgreSQL, and OpenAI. Upload PDF documents about yourself and let users query information through an intelligent chatbot interface.

## 🚀 Features

- **Admin Panel**: Upload and manage PDF documents
- **Smart Chat Interface**: AI-powered chatbot with conversation history
- **Vector Search**: Semantic search using OpenAI embeddings
- **Document Processing**: Automatic PDF text extraction and chunking
- **PostgreSQL Integration**: Robust database with vector storage
- **Real-time Responses**: Streaming chat interface
- **RESTful API**: Full API documentation with FastAPI

## 🛠️ Tech Stack

- **Backend**: FastAPI, Python 3.11+
- **Database**: PostgreSQL (Neon)
- **AI/ML**: OpenAI GPT-3.5-turbo, text-embedding-ada-002
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Vector Search**: Cosine similarity with scikit-learn
- **PDF Processing**: PyPDF2

## 📋 Prerequisites

- Python 3.11 or higher
- PostgreSQL database (configured)
- OpenAI API key
- pip (Python package manager)

## 🔧 Installation

### Option 1: Direct Installation

1. **Clone or create the project structure**:
```bash
mkdir rag-chatbot
cd rag-chatbot
```

2. **Create the files** (copy the code from the artifacts):
   - `main.py` - Main application file
   - `requirements.txt` - Python dependencies
   - `run.py` - Startup script
   - `.env.example` - Environment template

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Configure environment** (optional):
```bash
cp .env.example .env
# Edit .env with your credentials if you want to use environment variables
```

5. **Run the application**:
```bash
python run.py
```

### Option 2: Docker Installation

1. **Using Docker Compose** (recommended):
```bash
docker-compose up --build
```

2. **Using Docker directly**:
```bash
docker build -t rag-chatbot .
docker run -p 8000:8000 rag-chatbot
```

## 🌐 Access Points

Once running, access the application at:

- **Home Page**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin
- **Chat Interface**: http://localhost:8000/chat
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 📖 Usage Guide

### 1. Upload Documents (Admin Panel)

1. Navigate to http://localhost:8000/admin
2. Click "Choose a PDF file" and select your document
3. Click "Upload Document" to process the file
4. The system will:
   - Extract text from the PDF
   - Split it into chunks
   - Generate embeddings
   - Store everything in the database

### 2. Chat with the Bot

1. Go to http://localhost:8000/chat
2. Type your questions about the uploaded documents
3. The bot will:
   - Find relevant document chunks
   - Generate contextual responses
   - Maintain conversation history
   - Cite sources when applicable

### 3. API Usage

The system provides RESTful APIs:

```python
import requests

# Upload document
files = {'file': open('document.pdf', 'rb')}
response = requests.post('http://localhost:8000/upload-document', files=files)

# Chat query
data = {
    "message": "What is this person's background?",
    "session_id": "optional-session-id"
}
response = requests.post('http://localhost:8000/chat', json=data)
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file or set these environment variables:

```bash
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
HOST=0.0.0.0
PORT=8000
```

### Customization Options

Edit `main.py` to customize:

- **Chunk size**: Modify `CHUNK_SIZE` (default: 1000)
- **Embedding model**: Change `EMBEDDING_MODEL`
- **Chat model**: Update `CHAT_MODEL` (default: gpt-3.5-turbo)
- **Response length**: Adjust `max_tokens` parameter

## 🗄️ Database Schema

The system uses three main tables:

1. **documents**: Stores uploaded PDF metadata
2. **document_chunks**: Text chunks with embeddings
3. **chat_history**: Conversation logs by session

## 🚨 Troubleshooting

### Common Issues

1. **OpenAI API Errors**:
   - Verify your API key is valid
   - Check your OpenAI account has credits
   - Ensure proper internet connectivity

2. **Database Connection Issues**:
   - Verify PostgreSQL connection string
   - Check database permissions
   - Ensure SSL settings match your provider

3. **PDF Processing Errors**:
   - Ensure PDFs contain extractable text
   - Check file size limits
   - Try different PDF formats

4. **Embedding Generation Fails**:
   ```
   ERROR:root:Error getting embedding: Client.__init__() got an unexpected keyword argument 'proxies'
   ```
   This is fixed in the updated code - make sure you're using the latest version.

### Debug Mode

Run with debug logging:
```bash
python main.py --log-level debug
```

## 📊 Performance Tips

its fine as long as working on your own device

## 🔒 Security Considerations

users are testers

## 📈 Scalability

For production deployment:

haha

## 🤝 Contributing

dont

## 📄 License

none

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation at `/docs`
3. Create an issue in the repository

## 🚀 Quick Start Summary

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run the application
python run.py

# 3. Open browser to http://localhost:8000
# 4. Upload PDFs in Admin Panel
# 5. Start chatting!
```

That's it! Your RAG chatbot system is ready to use. Upload some documents about yourself and start chatting! 🎉