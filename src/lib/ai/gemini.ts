import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildChatPromptTemplate } from "./prompts";
import { retrieveRelevantKnowledge, detectLanguage } from "./retriever";

export interface ChatMessagePayload {
  role: "user" | "assistant";
  content: string;
}

export interface StreamChatOptions {
  message: string;
  history?: ChatMessagePayload[];
}

/**
 * Initializes Gemini model instance with temperature, safety settings, and system instructions
 */
export function getGeminiModel(apiKey: string, systemInstruction?: string, modelOverride?: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = modelOverride || process.env.GEMINI_MODEL || "gemini-3.5-flash";

  return genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: systemInstruction || undefined,
    generationConfig: {
      temperature: 0.35, // Low temperature for high factual accuracy
      topP: 0.9,
      maxOutputTokens: 900,
    },
  });
}

/**
 * Executes RAG retrieval, formats LangChain prompt, and streams Gemini response via SSE ReadableStream
 */
export async function streamChatResponse({
  message,
  history = [],
}: StreamChatOptions): Promise<ReadableStream<Uint8Array>> {
  const encoder = new TextEncoder();
  const apiKey = process.env.GEMINI_API_KEY?.trim() || "";
  const lang = detectLanguage(message);

  // 1. RAG Retrieval step: fetch top relevant portfolio chunks
  const { formattedContext } = await retrieveRelevantKnowledge(message, 4);

  // If no API key is provided, provide a graceful mock streaming answer using the verified knowledge base
  if (!apiKey) {
    return new ReadableStream({
      async start(controller) {
        const fallbackMsg =
          lang === "ar"
            ? `مرحباً بك! لم يتم تعيين مفتاح \`GEMINI_API_KEY\` في متغيرات البيئة بعد.\n\nإليك معلومات مؤكدة من ملف جبريل:\n\n${formattedContext}\n\nيمكنك التواصل مع جبريل مباشرة عبر البريد: [jebrilaabed@gmail.com](mailto:jebrilaabed@gmail.com) أو عبر [LinkedIn](https://www.linkedin.com/in/jebril-aabed).`
            : `Hello! The \`GEMINI_API_KEY\` environment variable is not configured yet.\n\nHere is verified information from Jebril's portfolio:\n\n${formattedContext}\n\nYou can also contact Jebril directly at [jebrilaabed@gmail.com](mailto:jebrilaabed@gmail.com) or connect on [LinkedIn](https://www.linkedin.com/in/jebril-aabed).`;

        // Stream fallback text word-by-word with small delays for smooth UI testing
        const words = fallbackMsg.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
          await new Promise((r) => setTimeout(r, 20));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
  }

  // 2. Prepare LangChain ChatPromptTemplate with retrieved context
  const promptTemplate = buildChatPromptTemplate();
  const formattedPrompt = await promptTemplate.formatMessages({
    context: formattedContext,
    input: message,
  });

  const systemInstruction = formattedPrompt[0].content as string;

  // 3. Prepare and sanitize conversation history for Gemini:
  // - Google Gemini API rules:
  //   1) First history message MUST have role 'user' (never 'model').
  //   2) Roles MUST strictly alternate (user -> model -> user -> model).
  //   3) The active query being sent should NOT be in history.
  const validHistory: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];

  for (const msg of history) {
    const role: "user" | "model" = msg.role === "assistant" ? "model" : "user";
    // Discard any initial welcome message from the assistant
    if (validHistory.length === 0 && role === "model") {
      continue;
    }
    const last = validHistory[validHistory.length - 1];
    if (last && last.role === role) {
      last.parts[0].text += `\n${msg.content}`;
    } else {
      validHistory.push({
        role,
        parts: [{ text: msg.content }],
      });
    }
  }

  // If the last history turn is a 'user' message, pop it so we don't have consecutive user messages
  if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === "user") {
    validHistory.pop();
  }

  // 4. Initialize Gemini client with native system instruction
  const model = getGeminiModel(apiKey, systemInstruction);

  const chat = model.startChat({
    history: validHistory,
  });

  // 5. Create streaming response
  return new ReadableStream({
    async start(controller) {
      try {
        const result = await chat.sendMessageStream(message);

        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: chunkText })}\n\n`)
            );
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err: unknown) {
        console.error("[Gemini Streaming Error]:", err);
        const errorMsg =
          lang === "ar"
            ? "\n\nعذراً، حدث خطأ أثناء الاتصال بنموذج الذكاء الاصطناعي. يُرجى المحاولة مرة أخرى أو مراسلة جبريل مباشرة."
            : "\n\nSorry, an error occurred while generating the response. Please try again or reach out to Jebril directly.";

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: errorMsg })}\n\n`)
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });
}

