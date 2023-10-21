"use client";
import React from "react";

export default function SSE() {
  const eventSource = new EventSource(`/api/sse`);
  React.useEffect(() => {
    eventSource.addEventListener("some-event", (e) => {
      console.log(e.data);
    });
    // eventSource.onopen = () => {
    //   console.log("open");
    // };
    // eventSource.onmessage = (e) => {
    //   console.log(e.data);
    // };
    // eventSource.onerror = (e) => {
    //   console.log(e);
    // };

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
}
