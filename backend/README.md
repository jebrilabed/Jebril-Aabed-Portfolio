# Python & LangChain AI Portfolio Assistant

Production-ready AI Assistant microservice for Jebril Aabed's portfolio, powered by **Python**, **FastAPI**, **LangChain**, and **Google Gemini** with a Retrieval-Augmented Generation (RAG) architecture.

---

## 🚀 Architecture Overview

```
User Message (Portfolio UI)
         ↓
Next.js API Route (/api/chat)
         ↓
FastAPI Microservice (POST /api/chat)
         ↓
Input Validation & Rate Limiting (25 req / 10 min)
         ↓
LangChain Hybrid RAG Retriever (Google Embeddings + BM25 Lexical)
         ↓
Retrieved Portfolio Documents (Personal, Skills, PayPerView, Projects, Education)
         ↓
LangChain ChatPromptTemplate + ChatGoogleGenerativeAI (Gemini 3.5 Flash)
         ↓
Server-Sent Events (SSE) Stream
         ↓
Next.js Frontend Chat Widget (Auto-scroll, Bilingual RTL/LTR, Markdown)
```

---

## 📁 Directory Structure

```
backend/
├── config.py           # Configuration & environment variable loading (.env.local)
├── main.py             # FastAPI entrypoint, CORS, rate limiter, and SSE streaming
├── retriever.py        # LangChain RAG pipeline (GoogleGenerativeAIEmbeddings + cosine similarity)
├── prompts.py          # LangChain ChatPromptTemplate with portfolio system instructions
├── test_chat.py        # Terminal testing script for the LangChain pipeline
├── requirements.txt    # Python dependencies
└── knowledge/          # Structured knowledge base modules
    ├── personal.py     # Profile, bio, and student status
    ├── skills.py       # Frontend, Backend, and AI/RAG skills
    ├── projects.py     # Verified projects (PayPerView, RAWNQ Store, etc.)
    ├── education.py    # Al-Azhar University engineering degree details
    └── contact.py      # Official contact channels and links
```

---

## 🛠️ How to Run

### 1. Run the Python Backend
From the root directory:
```bash
npm run ai:server
```
or directly with Python:
```bash
backend\venv\Scripts\python backend\main.py
```

The server will start on: **`http://localhost:8000`**
- Interactive Swagger API Docs: **`http://localhost:8000/docs`**
- Health Check: **`http://localhost:8000/health`**

### 2. Test the LangChain AI Pipeline
To test questions and streaming directly in the terminal:
```bash
npm run ai:test
```

### 3. Run the Next.js Frontend
```bash
npm run dev
```
The Next.js `/api/chat` route will automatically proxy incoming chat queries to the Python FastAPI server at `http://127.0.0.1:8000`. If the Python server is offline, it gracefully falls back to the internal TypeScript engine.

