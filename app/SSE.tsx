"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useTransition } from "react";

export default function SSE() {
  React.useEffect(() => {
    const eventSource = new EventSource(`/api/sse`, {
      withCredentials: true,
    });
    eventSource.onopen = () => {
      console.log("open");
    };
    eventSource.onmessage = (e) => {
      console.log(e.data);
    };
    eventSource.onerror = (e) => {
      console.log(e);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
}
