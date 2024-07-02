import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "A simple event management app",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
