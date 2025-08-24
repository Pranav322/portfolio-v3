#!/usr/bin/env python3
"""
Startup script for RAG Chatbot System
"""

import os
import sys
import subprocess
import logging

def setup_logging():
    """Setup logging configuration"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('app.log'),
            logging.StreamHandler(sys.stdout)
        ]
    )

def create_directories():
    """Create necessary directories"""
    directories = ['static', 'templates', 'logs']
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✓ Created directory: {directory}")

def install_requirements():
    """Install Python requirements"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✓ Requirements installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"✗ Error installing requirements: {e}")
        sys.exit(1)

def start_server():
    """Start the FastAPI server"""
    try:
        import uvicorn
        print("\n" + "="*50)
        print("🚀 Starting RAG Chatbot System")
        print("="*50)
        print("📍 Admin Panel: http://localhost:8000/admin")
        print("💬 Chat Interface: http://localhost:8000/chat")
        print("📚 API Docs: http://localhost:8000/docs")
        print("="*50 + "\n")
        
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            reload_dirs=["./"],
            log_level="info"
        )
    except ImportError:
        print("✗ Uvicorn not found. Installing requirements...")
        install_requirements()
        start_server()
    except Exception as e:
        print(f"✗ Error starting server: {e}")
        sys.exit(1)

def main():
    """Main function"""
    print("🔧 Setting up RAG Chatbot System...")
    
    setup_logging()
    create_directories()
    
    # Check if requirements.txt exists
    if not os.path.exists('requirements.txt'):
        print("✗ requirements.txt not found!")
        sys.exit(1)
    
    # Check if main.py exists
    if not os.path.exists('main.py'):
        print("✗ main.py not found!")
        sys.exit(1)
    
    start_server()

if __name__ == "__main__":
    main()