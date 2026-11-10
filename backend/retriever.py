import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

import re
import math
from typing import List, Dict, Any, Tuple
from langchain_core.documents import Document
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from config import GEMINI_API_KEY, GOOGLE_EMBEDDING_MODEL
from knowledge import get_all_langchain_documents

ARABIC_REGEX = re.compile(r"[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]")

def detect_language(text: str) -> str:
    """Detects whether user prompt is predominantly Arabic or English."""
    cleaned = re.sub(r"[\s\d\W_]+", "", text)
    if not cleaned:
        return "en"
    arabic_chars = len(ARABIC_REGEX.findall(cleaned))
    ratio = arabic_chars / len(cleaned)
    return "ar" if ratio >= 0.25 else "en"

def cosine_similarity(v1: List[float], v2: List[float]) -> float:
    dot = sum(a * b for a, b in zip(v1, v2))
    norm1 = math.sqrt(sum(a * a for a in v1))
    norm2 = math.sqrt(sum(b * b for b in v2))
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return dot / (norm1 * norm2)

class PortfolioRAGRetriever:
    """
    Hybrid RAG Retriever powered by LangChain:
    Combines Google Generative AI Embeddings with lexical BM25/keyword metadata matching.
    """
    def __init__(self):
        self.documents: List[Document] = get_all_langchain_documents()
        self.embeddings_model = None
        self.doc_embeddings: Dict[str, List[float]] = {}
        self._init_embeddings()

    def _init_embeddings(self):
        if not GEMINI_API_KEY:
            return
        try:
            self.embeddings_model = GoogleGenerativeAIEmbeddings(
                model=f"models/{GOOGLE_EMBEDDING_MODEL}" if not GOOGLE_EMBEDDING_MODEL.startswith("models/") else GOOGLE_EMBEDDING_MODEL,
                google_api_key=GEMINI_API_KEY
            )
            # Pre-compute document embeddings once at startup
            texts = [doc.page_content for doc in self.documents]
            vectors = self.embeddings_model.embed_documents(texts)
            for doc, vec in zip(self.documents, vectors):
                self.doc_embeddings[doc.metadata["id"]] = vec
            print(f"[RAG Retriever] Successfully embedded {len(self.documents)} knowledge documents via LangChain.")
        except Exception as e:
            print(f"[RAG Retriever Warning] Could not pre-compute embeddings ({e}). Falling back to lexical hybrid matching.")
            self.embeddings_model = None

    def _lexical_score(self, query: str, doc: Document) -> float:
        q_tokens = [t.lower() for t in re.findall(r"\w+", query) if len(t) > 1]
        if not q_tokens:
            return 0.0

        score = 0.0
        doc_tags = [str(t).lower() for t in doc.metadata.get("tags", [])]
        title_en = doc.metadata.get("title_en", "").lower()
        title_ar = doc.metadata.get("title_ar", "").lower()
        content = doc.page_content.lower()

        for token in q_tokens:
            # Tag match (highest weight)
            if any(token in tag for tag in doc_tags):
                score += 3.0
            # Title match
            if token in title_en or token in title_ar:
                score += 2.0
            # Body match
            if token in content:
                score += 1.0

        return score / max(len(q_tokens), 1)

    def retrieve(self, query: str, top_k: int = 4) -> List[Document]:
        """Retrieves top_k most relevant documents for the given query."""
        lang = detect_language(query)
        scored_docs: List[Tuple[Document, float]] = []

        query_vector = None
        if self.embeddings_model:
            try:
                query_vector = self.embeddings_model.embed_query(query)
            except Exception as e:
                print(f"[Query Embedding Warning]: {e}")

        for doc in self.documents:
            sem_score = 0.0
            doc_id = doc.metadata["id"]
            if query_vector and doc_id in self.doc_embeddings:
                sem_score = cosine_similarity(query_vector, self.doc_embeddings[doc_id])

            lex_score = self._lexical_score(query, doc)
            # Normalize lexical score
            norm_lex = min(lex_score / 5.0, 1.0)
            
            # Hybrid combined score
            if query_vector:
                total_score = (sem_score * 0.75) + (norm_lex * 0.25)
            else:
                total_score = norm_lex

            scored_docs.append((doc, total_score))

        scored_docs.sort(key=lambda x: x[1], reverse=True)
        return [doc for doc, _ in scored_docs[:top_k]]

    def format_context(self, docs: List[Document], lang: str) -> str:
        """Formats retrieved documents into a clean context string for the prompt."""
        formatted_chunks = []
        for i, doc in enumerate(docs, 1):
            title = doc.metadata["title_ar"] if lang == "ar" else doc.metadata["title_en"]
            content = doc.metadata["content_ar"] if lang == "ar" else doc.metadata["content_en"]
            links = doc.metadata.get("links", [])
            links_str = ""
            if links:
                links_items = [
                    f"- {l.get('label_ar' if lang == 'ar' else 'label_en')}: {l.get('url')}"
                    for l in links
                ]
                links_str = "\nLinks:\n" + "\n".join(links_items)

            formatted_chunks.append(
                f"[Source {i}: {title}]\n{content}{links_str}"
            )
        return "\n\n---\n\n".join(formatted_chunks)

# Singleton retriever instance
retriever = PortfolioRAGRetriever()

