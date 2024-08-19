import { World } from "@/components/Globe";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
