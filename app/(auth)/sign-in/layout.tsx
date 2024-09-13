import React from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign In",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center border bg-white/40 px-6">
      <div>{children}</div>
    </div>
  );
}
