import pytest
from unittest.mock import patch, Mock
from fastapi import HTTPException
import sys
import os

# Ensure src is importable
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.routes.admin import extract_text_from_file

@pytest.fixture
def mock_pdf_extractor():
    # Mock PdfReader within the module
    with patch("src.routes.admin.PdfReader") as mock_reader_cls:
        mock_pdf = Mock()
        mock_page = Mock()
        mock_page.extract_text.return_value = "PDF Content"
        mock_pdf.pages = [mock_page]
        mock_reader_cls.return_value = mock_pdf
        yield mock_reader_cls

def test_extract_pdf_by_content_type(mock_pdf_extractor):
    content = b"fake pdf content"
    result = extract_text_from_file(content, "application/pdf", "file.unknown")
    assert result == "PDF Content"
    mock_pdf_extractor.assert_called_once()

def test_extract_pdf_by_extension(mock_pdf_extractor):
    content = b"fake pdf content"
    result = extract_text_from_file(content, "application/octet-stream", "file.pdf")
    assert result == "PDF Content"
    mock_pdf_extractor.assert_called_once()

def test_extract_text_plain_by_content_type():
    content = b"Hello World"
    result = extract_text_from_file(content, "text/plain", "file.unknown")
    assert result == "Hello World"

def test_extract_text_markdown_by_content_type():
    content = b"# Title"
    result = extract_text_from_file(content, "text/markdown", "file.unknown")
    assert result == "# Title"

def test_extract_text_by_extension_txt():
    content = b"Hello World"
    result = extract_text_from_file(content, "application/octet-stream", "file.txt")
    assert result == "Hello World"

def test_extract_text_by_extension_md():
    content = b"# Title"
    result = extract_text_from_file(content, "application/octet-stream", "file.md")
    assert result == "# Title"

def test_unsupported_file_type():
    content = b"garbage"
    with pytest.raises(HTTPException) as exc:
        extract_text_from_file(content, "application/json", "file.json")
    assert exc.value.status_code == 400
    assert "Unsupported file type" in exc.value.detail

def test_precedence_pdf_over_text_check(mock_pdf_extractor):
    # This verifies existing behavior: PDF check comes first.
    # If content_type is text but extension is pdf, it's treated as PDF.
    content = b"ambiguous content"
    result = extract_text_from_file(content, "text/plain", "file.pdf")
    assert result == "PDF Content"
    mock_pdf_extractor.assert_called_once()
