import os
from pathlib import Path
from dotenv import load_dotenv

# Search for .env.local in parent directory first, then current directory
current_dir = Path(__file__).resolve().parent
parent_env = current_dir.parent / ".env.local"
local_env = current_dir / ".env"

if parent_env.exists():
    load_dotenv(parent_env)
elif local_env.exists():
    load_dotenv(local_env)
else:
    load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.5-flash").strip()
GOOGLE_EMBEDDING_MODEL = os.getenv("GOOGLE_EMBEDDING_MODEL", "gemini-embedding-001").strip()
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://jebril-aabed-portfolio.vercel.app",
    "*"
]

