import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="h-full pt-24">{children}</div>;
}
