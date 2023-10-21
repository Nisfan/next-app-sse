"use client";
import React from "react";

export default function SSE() {
  React.useEffect(() => {
    const eventSource = new EventSource(`/api/sse`);
    eventSource.addEventListener("hello-event", (e) => {
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

  return <div>SSE</div>;
}
