import { Document } from "@langchain/core/documents";
import { ALL_KNOWLEDGE_CHUNKS, type KnowledgeChunk } from "./knowledge";
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface RetrievedContext {
  chunks: KnowledgeChunk[];
  formattedContext: string;
  detectedLanguage: "ar" | "en";
}

// In-memory cache for document embeddings so we only embed once per server life
let cachedDocEmbeddings: Map<string, number[]> | null = null;
let isEmbeddingInProgress = false;

/**
 * Detects whether the user's input text is primarily Arabic or English
 */
export function detectLanguage(text: string): "ar" | "en" {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  const arabicChars = (text.match(new RegExp(arabicRegex, "g")) || []).length;
  const latinRegex = /[a-zA-Z]/;
  const latinChars = (text.match(new RegExp(latinRegex, "g")) || []).length;

  if (arabicChars > 0 && arabicChars >= latinChars * 0.5) {
    return "ar";
  }
  return "en";
}

/**
 * Computes cosine similarity between two numeric vectors
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Lexical / Keyword Scoring with Arabic & English normalization
 */
function computeLexicalScore(query: string, chunk: KnowledgeChunk): number {
  const qClean = query.toLowerCase().trim();
  const tokens = qClean.split(/\s+/).filter((t) => t.length > 1);
  if (tokens.length === 0) return 0;

  const searchableText = [
    chunk.titleEn,
    chunk.titleAr,
    chunk.contentEn,
    chunk.contentAr,
    ...chunk.tags,
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;

  for (const token of tokens) {
    // Exact token match in tags gives highest boost
    if (chunk.tags.some((tag) => tag.toLowerCase() === token)) {
      score += 4;
    }
    // Match in title
    if (chunk.titleEn.toLowerCase().includes(token) || chunk.titleAr.includes(token)) {
      score += 3;
    }
    // Match in body content
    if (searchableText.includes(token)) {
      score += 1;
    }
  }

  // Normalize by number of query tokens
  return score / tokens.length;
}

/**
 * Initializes or retrieves document embeddings using Google Embedding model
 */
async function getOrComputeDocEmbeddings(apiKey: string): Promise<Map<string, number[]> | null> {
  if (cachedDocEmbeddings) return cachedDocEmbeddings;
  if (!apiKey || isEmbeddingInProgress) return null;

  isEmbeddingInProgress = true;
  try {
    const ai = new GoogleGenerativeAI(apiKey);
    const embeddingModelName = process.env.GOOGLE_EMBEDDING_MODEL || "text-embedding-004";
    const model = ai.getGenerativeModel({ model: embeddingModelName });

    const embeddingsMap = new Map<string, number[]>();

    // Embed all chunks
    await Promise.all(
      ALL_KNOWLEDGE_CHUNKS.map(async (chunk) => {
        try {
          const textToEmbed = `${chunk.titleEn} (${chunk.titleAr}): ${chunk.contentEn} ${chunk.contentAr}`;
          const res = await model.embedContent(textToEmbed);
          if (res.embedding?.values) {
            embeddingsMap.set(chunk.id, res.embedding.values);
          }
        } catch (err) {
          console.warn(`[RAG] Failed to embed chunk ${chunk.id}:`, err);
        }
      })
    );

    if (embeddingsMap.size > 0) {
      cachedDocEmbeddings = embeddingsMap;
    }
    return cachedDocEmbeddings;
  } catch (err) {
    console.warn("[RAG] Failed to initialize Google embeddings:", err);
    return null;
  } finally {
    isEmbeddingInProgress = false;
  }
}

/**
 * Main RAG Retriever: Retrieves top relevant knowledge chunks using
 * Hybrid Search (Semantic Cosine Similarity + Bilingual Lexical Matching)
 */
export async function retrieveRelevantKnowledge(
  query: string,
  topK: number = 3
): Promise<RetrievedContext> {
  const language = detectLanguage(query);
  const apiKey = process.env.GEMINI_API_KEY || "";

  // 1. Compute lexical scores for all chunks
  const lexicalScores = new Map<string, number>();
  let maxLexical = 0;
  for (const chunk of ALL_KNOWLEDGE_CHUNKS) {
    const score = computeLexicalScore(query, chunk);
    lexicalScores.set(chunk.id, score);
    if (score > maxLexical) maxLexical = score;
  }

  // 2. Attempt semantic embedding retrieval if API key is present
  const semanticScores = new Map<string, number>();
  if (apiKey) {
    try {
      const docEmbeddings = await getOrComputeDocEmbeddings(apiKey);
      if (docEmbeddings && docEmbeddings.size > 0) {
        const ai = new GoogleGenerativeAI(apiKey);
        const embeddingModelName = process.env.GOOGLE_EMBEDDING_MODEL || "text-embedding-004";
        const model = ai.getGenerativeModel({ model: embeddingModelName });
        const queryEmbedRes = await model.embedContent(query);
        const queryVector = queryEmbedRes.embedding?.values;

        if (queryVector) {
          for (const [id, docVec] of docEmbeddings.entries()) {
            const sim = cosineSimilarity(queryVector, docVec);
            semanticScores.set(id, sim);
          }
        }
      }
    } catch (err) {
      console.warn("[RAG] Semantic query embedding failed, relying on lexical search:", err);
    }
  }

  // 3. Combine scores with hybrid weights (60% semantic if available, 40% lexical)
  const scoredChunks = ALL_KNOWLEDGE_CHUNKS.map((chunk) => {
    const lexRaw = lexicalScores.get(chunk.id) || 0;
    const lexNorm = maxLexical > 0 ? lexRaw / maxLexical : 0;
    const sem = semanticScores.get(chunk.id);

    let finalScore = lexNorm;
    if (sem !== undefined) {
      finalScore = 0.6 * sem + 0.4 * lexNorm;
    }

    return { chunk, score: finalScore };
  });

  // Sort descending by score
  scoredChunks.sort((a, b) => b.score - a.score);

  // Take top-K chunks
  let selected = scoredChunks.slice(0, topK).map((s) => s.chunk);

  // Always include contact info chunk if query asks about contact or availability
  const contactKeywords = ["contact", "email", "hire", "work", "reach", "تواصل", "إيميل", "بريد", "توظيف", "هاتف", "لينكد"];
  const isContactQuery = contactKeywords.some((k) => query.toLowerCase().includes(k));
  if (isContactQuery && !selected.some((c) => c.category === "contact")) {
    const contactChunk = ALL_KNOWLEDGE_CHUNKS.find((c) => c.id === "contact-info");
    if (contactChunk) {
      selected = [...selected, contactChunk];
    }
  }

  // If no high match was found (very generic query), provide the bio chunk as fallback
  if (selected.length === 0) {
    const defaultBio = ALL_KNOWLEDGE_CHUNKS.find((c) => c.id === "personal-bio");
    if (defaultBio) selected.push(defaultBio);
  }

  // Convert to LangChain Documents for metadata inspection & formatting
  const documents = selected.map(
    (chunk) =>
      new Document({
        pageContent:
          language === "ar"
            ? `${chunk.titleAr}\n${chunk.contentAr}`
            : `${chunk.titleEn}\n${chunk.contentEn}`,
        metadata: {
          id: chunk.id,
          category: chunk.category,
          links: chunk.links || [],
        },
      })
  );

  // Format context for LLM injection
  const formattedContext = documents
    .map((doc, idx) => `[Source ${idx + 1} - ${doc.metadata.category}]:\n${doc.pageContent}`)
    .join("\n\n---\n\n");

  return {
    chunks: selected,
    formattedContext,
    detectedLanguage: language,
  };
}

