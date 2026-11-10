import { NextRequest, NextResponse } from "next/server";
import { streamChatResponse, type ChatMessagePayload } from "@/lib/ai/gemini";
import { checkRateLimit, getClientIp } from "@/lib/ai/rate-limiter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a moment before sending more messages.",
          errorAr: "لقد تجاوزت الحد المسموح به من الرسائل. يُرجى الانتظار قليلاً والمحاولة لاحقاً.",
          retryAfter: rateLimit.resetSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetSeconds.toString(),
          },
        }
      );
    }

    // 2. Parse & Validate Request Body
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const rawMessage = typeof body.message === "string" ? body.message.trim() : "";
    if (!rawMessage) {
      return NextResponse.json(
        { error: "Message cannot be empty", errorAr: "لا يمكن إرسال رسالة فارغة" },
        { status: 400 }
      );
    }

    // Input length limit (prevent prompt overflow)
    if (rawMessage.length > 500) {
      return NextResponse.json(
        {
          error: "Message is too long. Please keep questions under 500 characters.",
          errorAr: "الرسالة طويلة جداً. يُرجى كتابة سؤال أقل من 500 حرف.",
        },
        { status: 400 }
      );
    }

    // Sanitize conversation history
    interface RawHistoryItem {
      role: string;
      content: string;
    }

    const rawHistory: unknown[] = Array.isArray(body.history) ? body.history : [];
    const validItems: RawHistoryItem[] = rawHistory.filter(
      (item: unknown): item is RawHistoryItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as { role: unknown }).role === "string" &&
        typeof (item as { content: unknown }).content === "string"
    );

    const sanitizedHistory: ChatMessagePayload[] = validItems.map((item: RawHistoryItem) => ({
      role: item.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: item.content.slice(0, 500),
    }));

    // 3. Initiate Streaming Chat Response (Forward to Python LangChain Backend if configured)
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL?.trim();
    if (pythonBackendUrl) {
      try {
        const pyRes = await fetch(`${pythonBackendUrl.replace(/\/$/, "")}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: rawMessage,
            history: sanitizedHistory,
          }),
        });

        if (pyRes.ok && pyRes.body) {
          return new Response(pyRes.body, {
            headers: {
              "Content-Type": "text/event-stream; charset=utf-8",
              "Cache-Control": "no-cache, no-transform",
              Connection: "keep-alive",
              "X-Accel-Buffering": "no",
            },
          });
        }
        console.warn(`[Python Backend Error ${pyRes.status}]: Falling back to TypeScript engine.`);
      } catch (pyErr) {
        console.warn("[Python Backend Unreachable]: Falling back to TypeScript engine.", pyErr);
      }
    }

    // Fallback: Local TypeScript Gemini RAG engine
    const stream = await streamChatResponse({
      message: rawMessage,
      history: sanitizedHistory,
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: unknown) {
    const errorMsg = (err as Error)?.message || String(err);
    console.error("[Chat API Error]:", errorMsg);
    return NextResponse.json(
      {
        error: errorMsg || "An unexpected error occurred while processing your request.",
        errorAr: "حدث خطأ غير متوقع أثناء معالجة رسالتك.",
      },
      { status: 500 }
    );
  }
}

