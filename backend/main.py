import sys
from pathlib import Path

# Add backend directory to sys.path so imports work regardless of working directory
BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

import json
import time
from typing import List, AsyncGenerator
from collections import defaultdict

from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel, Field

from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from langchain_google_genai import ChatGoogleGenerativeAI

from config import GEMINI_API_KEY, GEMINI_MODEL, ALLOWED_ORIGINS, HOST, PORT
from retriever import retriever, detect_language
from prompts import create_chat_prompt_template

app = FastAPI(
    title="Jebril Aabed Portfolio AI Assistant",
    description="Python & LangChain powered AI Assistant with RAG retrieval and Google Gemini streaming.",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory IP rate limiter (25 requests per 10 minutes)
ip_request_timestamps = defaultdict(list)
RATE_LIMIT_WINDOW = 600  # 10 minutes
MAX_REQUESTS_PER_WINDOW = 25

class ChatMessageInput(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str = Field(..., max_length=1000)

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=500)
    history: List[ChatMessageInput] = Field(default_factory=list)

@app.get("/")
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Jebril Portfolio AI Assistant (Python + LangChain)",
        "model": GEMINI_MODEL,
        "has_api_key": bool(GEMINI_API_KEY)
    }

def extract_text_from_chunk(content) -> str:
    """Extracts pure string from LangChain chunk content whether it's str or list of parts."""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        extracted = []
        for part in content:
            if isinstance(part, str):
                extracted.append(part)
            elif isinstance(part, dict) and "text" in part:
                extracted.append(part["text"])
        return "".join(extracted)
    return str(content)

async def generate_sse_stream(message: str, history: List[ChatMessageInput]) -> AsyncGenerator[str, None]:
    """
    RAG Retrieval + LangChain Chain + Server-Sent Events (SSE) Streaming.
    """
    lang = detect_language(message)
    
    # 1. RAG Retrieval Step
    matched_docs = retriever.retrieve(message, top_k=4)
    formatted_context = retriever.format_context(matched_docs, lang)

    # 2. Format conversation history for LangChain
    history_messages: List[BaseMessage] = []
    for item in history:
        if item.role == "assistant":
            history_messages.append(AIMessage(content=item.content))
        else:
            history_messages.append(HumanMessage(content=item.content))

    # Keep conversation history bounded to the most recent 6 messages
    if len(history_messages) > 6:
        history_messages = history_messages[-6:]

    # Ensure history does not start with an AIMessage for strict LLM alternating turns
    while history_messages and isinstance(history_messages[0], AIMessage):
        history_messages.pop(0)

    # 3. Initialize LangChain Google GenAI Model
    if not GEMINI_API_KEY:
        mock_reply = (
            "مرحباً بك! يعمل الشات بوت حالياً بوضع الاسترجاع التجريبي. يمكنك التواصل مع جبريل مباشرة عبر البريد jebrilaabed9@gmail.com أو LinkedIn."
            if lang == "ar" else
            "Welcome! The AI Assistant is operating in demo retrieval mode. Feel free to contact Jebril directly at jebrilaabed9@gmail.com or via LinkedIn."
        )
        yield f"data: {json.dumps({'text': mock_reply})}\n\n"
        yield "data: [DONE]\n\n"
        return

    llm = ChatGoogleGenerativeAI(
        model=GEMINI_MODEL,
        google_api_key=GEMINI_API_KEY,
        temperature=0.35,
        max_output_tokens=2500,
    )

    prompt_template = create_chat_prompt_template()
    chain = prompt_template | llm

    try:
        # 4. Stream response tokens via LangChain astream
        async for chunk in chain.astream({
            "context": formatted_context,
            "history": history_messages,
            "input": message
        }):
            token_text = extract_text_from_chunk(chunk.content)
            if token_text:
                payload = json.dumps({"text": token_text})
                yield f"data: {payload}\n\n"

        # Signal completion to client
        yield "data: [DONE]\n\n"

    except Exception as e:
        error_msg = str(e)
        print(f"[LangChain Streaming Error]: {error_msg}")
        err_payload = json.dumps({
            "error": "Failed to stream answer from AI model.",
            "text": "\n\nعذراً، حدث خطأ أثناء توليد الإجابة. يُرجى المحاولة مرة أخرى." if lang == "ar" else "\n\nSorry, an error occurred while generating the response. Please try again."
        })
        yield f"data: {err_payload}\n\n"
        yield "data: [DONE]\n\n"

@app.post("/api/chat")
async def chat_endpoint(request: Request, body: ChatRequest):
    # 1. Rate Limiting Check
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    
    # Filter out requests older than window
    timestamps = [t for t in ip_request_timestamps[client_ip] if now - t < RATE_LIMIT_WINDOW]
    if len(timestamps) >= MAX_REQUESTS_PER_WINDOW:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Please wait a few minutes before trying again."
        )
    timestamps.append(now)
    ip_request_timestamps[client_ip] = timestamps

    # 2. Return SSE Stream
    return StreamingResponse(
        generate_sse_stream(body.message, body.history),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, app_dir=str(BACKEND_DIR), reload=True)

