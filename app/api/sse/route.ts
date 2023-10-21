// import type { NextApiRequest, NextApiResponse } from "next";

import { stream } from "@/app/serverActions";
import { NextResponse } from "next/server";
// export const delay = (ms: number) =>
//   new Promise<void>((resolve) => setTimeout(resolve, ms));
export const runtime = "edge";

// This is required to enable streaming
export const dynamic = "force-dynamic";
// export const runtime = "edge"; // 'nodejs' (default) | 'edge'
function writeMessage(
  writer: WritableStreamDefaultWriter,
  encoder: TextEncoder,
  message: any,
): void {
  if (message.comment) {
    void writer.write(encoder.encode(`: ${message.comment}\n`));
  }
  if (message.event) {
    void writer.write(encoder.encode(`event: ${message.event}\n`));
  }
  if (message.id) {
    void writer.write(encoder.encode(`id: ${message.id}\n`));
  }
  if (message.retry) {
    void writer.write(encoder.encode(`retry: ${message.retry}\n`));
  }
  // if (message.data) {
  //   void writer.write(encoder.encode(toDataString(message.data)));
  // }
}

export async function GET() {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  // writeMessage(writer, encoder, {
  //   event: "some-event",
  // });

  const event = "some-event";
  const data = {
    id: 112,
  };

  writer.write(
    encoder.encode(`event: ${event}\ndata: ${JSON.stringify({ data })}\n\n`),
  ); // <- the format here is important!
  // const resp = new EventSource("https://next-app-sse.vercel.app/api/sse");
  // resp.onmessage = async (e) => {
  //   await writer.write(encoder.encode(`event: message\ndata: ${e.data}\n\n`));
  // };
  //
  // resp.onerror = async () => {
  //   resp.close();
  //   await writer.close();
  // };
  //
  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
