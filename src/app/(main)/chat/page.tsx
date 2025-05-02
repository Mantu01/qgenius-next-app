"use client";

import { useState } from "react";

export default function StreamViewer() {
  const [chunks, setChunks] = useState<string[]>([]);
  const [count, setCount] = useState<string>();
  const [loading, setLoading] = useState(false);

  const startStreaming = async () => {
    setChunks([]);
    setLoading(true);

    const res = await fetch("/api/qna", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line) {
          const parsed = JSON.parse(line);
          setChunks((prev) => [...prev, `#${parsed.index} - ${parsed.message}`]);
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-bold">Streamed Chunks</h2>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={startStreaming}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          {loading ? "Streaming..." : "Start"}
        </button>
      </div>

      <div className="bg-gray-100 p-2 rounded font-mono text-sm">
        {chunks.map((chunk, idx) => (
          <div key={idx}>{chunk}</div>
        ))}
      </div>
    </div>
  );
}
