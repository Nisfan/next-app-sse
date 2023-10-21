// import type { NextApiRequest, NextApiResponse } from "next";

import { stream } from "@/app/serverActions";
// export const delay = (ms: number) =>
//   new Promise<void>((resolve) => setTimeout(resolve, ms));

export const dynamic = "force-dynamic";
// export const runtime = "edge"; // 'nodejs' (default) | 'edge'

export async function GET() {
  let responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const resp = new EventSource("https://next-app-sse.vercel.app/api/sse");
  resp.onmessage = async (e) => {
    await writer.write(encoder.encode(`event: message\ndata: ${e.data}\n\n`));
  };

  resp.onerror = async () => {
    resp.close();
    await writer.close();
  };

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
