"use client";

import Header from "@/components/shared/Header";
import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <Header />
      <div className="m-auto">{children}</div>
    </Suspense>
  );
}
