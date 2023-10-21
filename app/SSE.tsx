"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useTransition } from "react";

export default function SSE() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const callSSE = () => {
    const eventSource = new EventSource(`/api/sse`);
    eventSource.addEventListener("myEventName", (e) => {
      // the event name here must be the same as in the API
      console.log("client", JSON.parse(e.data));
      startTransition(() => {
        router.refresh();
      });
    });
    eventSource.addEventListener("open", (e) => {
      console.log("open", e);
    });
    eventSource.addEventListener("error", (e) => {
      eventSource.close();
    });
  };

  React.useEffect(() => {
    callSSE();
  }, []);

  return null;
}
