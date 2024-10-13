import Header from "@/components/shared/Header";
import React, { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <div className="mx-auto mt-16 max-w-4xl px-4">{children}</div>
    </Suspense>
  );
}
