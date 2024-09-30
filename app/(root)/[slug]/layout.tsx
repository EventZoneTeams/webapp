import Header from "@/components/shared/Header";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="m-auto mt-12 w-[900px] py-4">{children}</div>
    </div>
  );
}
