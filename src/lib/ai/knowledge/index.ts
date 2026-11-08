import { personalInfoChunks, type KnowledgeChunk } from "./personal";
import { skillsChunks } from "./skills";
import { projectsChunks } from "./projects";
import { educationChunks } from "./education";
import { contactChunks } from "./contact";

export type { KnowledgeChunk };

export const ALL_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  ...personalInfoChunks,
  ...skillsChunks,
  ...projectsChunks,
  ...educationChunks,
  ...contactChunks,
];

export function getKnowledgeChunkById(id: string): KnowledgeChunk | undefined {
  return ALL_KNOWLEDGE_CHUNKS.find((chunk) => chunk.id === id);
}

export function getKnowledgeChunksByCategory(
  category: KnowledgeChunk["category"]
): KnowledgeChunk[] {
  return ALL_KNOWLEDGE_CHUNKS.filter((chunk) => chunk.category === category);
}

