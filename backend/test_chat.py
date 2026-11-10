import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

import asyncio
from config import GEMINI_API_KEY, GEMINI_MODEL
from retriever import retriever, detect_language
from prompts import create_chat_prompt_template
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

def extract_text_from_chunk(content) -> str:
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

async def main():
    print(f"Testing LangChain & Google Gemini setup...")
    print(f"Model: {GEMINI_MODEL}")
    print(f"API Key configured: {bool(GEMINI_API_KEY)}")

    test_queries = [
        "شو هي خبرات جبريل بالذكاء الاصطناعي و PayPerView؟",
        "What are Jebril's primary frontend technical skills?"
    ]

    llm = ChatGoogleGenerativeAI(
        model=GEMINI_MODEL,
        google_api_key=GEMINI_API_KEY,
        temperature=0.35,
        max_output_tokens=1500,
    )
    prompt_template = create_chat_prompt_template()
    chain = prompt_template | llm

    for q in test_queries:
        lang = detect_language(q)
        print("\n" + "="*50)
        print(f"Query: {q} (Detected lang: {lang})")
        matched = retriever.retrieve(q, top_k=3)
        print(f"Retrieved {len(matched)} docs: {[d.metadata['id'] for d in matched]}")
        context = retriever.format_context(matched, lang)

        print("\n[Streaming Answer]:")
        async for chunk in chain.astream({
            "context": context,
            "history": [],
            "input": q
        }):
            content = extract_text_from_chunk(chunk.content)
            print(content, end="", flush=True)
        print("\n")

if __name__ == "__main__":
    asyncio.run(main())

