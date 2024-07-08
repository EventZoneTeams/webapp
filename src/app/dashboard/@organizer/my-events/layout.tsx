import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "My Events",
  description: "My Events",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
