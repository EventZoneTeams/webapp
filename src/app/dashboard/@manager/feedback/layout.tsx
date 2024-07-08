import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Feedbacks",
  description: "A simple event management app",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
