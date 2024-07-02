import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Event Info",
  description: "A simple event management app",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
