from typing import List
from langchain_core.documents import Document

from .personal import PERSONAL_DOCUMENTS
from .skills import SKILLS_DOCUMENTS
from .projects import PROJECTS_DOCUMENTS
from .education import EDUCATION_DOCUMENTS
from .contact import CONTACT_DOCUMENTS

ALL_RAW_DOCUMENTS = [
    *PERSONAL_DOCUMENTS,
    *SKILLS_DOCUMENTS,
    *PROJECTS_DOCUMENTS,
    *EDUCATION_DOCUMENTS,
    *CONTACT_DOCUMENTS,
]

def get_all_langchain_documents() -> List[Document]:
    """
    Transforms raw portfolio knowledge into standard LangChain Document objects.
    Each Document contains bilingual contents and structured metadata.
    """
    docs: List[Document] = []
    for item in ALL_RAW_DOCUMENTS:
        # Combined content for bilingual semantic search
        combined_text = (
            f"=== {item['title_en']} | {item['title_ar']} ===\n"
            f"[English Content]:\n{item['content_en']}\n\n"
            f"[Arabic Content]:\n{item['content_ar']}"
        )
        
        doc = Document(
            page_content=combined_text,
            metadata={
                "id": item["id"],
                "category": item["category"],
                "title_en": item["title_en"],
                "title_ar": item["title_ar"],
                "content_en": item["content_en"],
                "content_ar": item["content_ar"],
                "tags": item.get("tags", []),
                "links": item.get("links", []),
            }
        )
        docs.append(doc)
    return docs

