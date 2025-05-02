// app/api/stream/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const count = Number(body.count || 50);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 1; i <= count; i++) {
        const chunk = JSON.stringify({ index: i, message: `Chunk ${i}` }) + "\n";
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, 100)); // simulate delay
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
    },
  });
}
