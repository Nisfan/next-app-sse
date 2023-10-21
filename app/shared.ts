export const stream = new TransformStream();
const writer = stream.writable.getWriter();
const encoder = new TextEncoder();

export function writeEvent(event: string, data: any) {
  writer.write(
    encoder.encode(`event: ${event}\ndata: ${JSON.stringify({ data })}\n\n`),
  ); // <- the format here is important!
}
