"use client";

import dynamic from "next/dynamic";

export const AIChatWidget = dynamic(
  () => import("./AIChatWidget"),
  { ssr: false }
);

export default AIChatWidget;

