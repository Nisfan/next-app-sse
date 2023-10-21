// import type { NextApiRequest, NextApiResponse } from "next";

import { stream } from "@/app/serverActions";
// export const delay = (ms: number) =>
//   new Promise<void>((resolve) => setTimeout(resolve, ms));

export const dynamic = "force-dynamic";
// export const runtime = "edge"; // 'nodejs' (default) | 'edge'

export async function GET() {
  // res.setHeader("Content-Type", "text/event-stream");
  // res.setHeader("Cache-Control", "no-cache, no-transform");
  // res.setHeader("Connection", "keep-alive");
  let responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  console.log("listening to events");
  // let counter = 0;

  const eventSource = new EventSource(`/api/sse`);
  eventSource.dispatchEvent;
  stream.on("channel", function (event, data) {
    //res.write(JSON.stringify({ counter: data })); // NOTE: this DOES NOT work
    console.log("event", event);
    console.log("event.data", data);

    res.write(
      `event: ${event}\ndata: ${JSON.stringify({ counter: data })}\n\n`,
    ); // <- the format here is important!
  });

  // for (let i = 0; i < 10; ++i) {
  //   stream.emit("channel", "myEventName", counter); // the event name here must be the same as in the EventSource in frontend
  //   console.log("update counter", counter);
  //   counter++;
  //   await delay(1000);
  // }
  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
  // res.end("done\n");
}
