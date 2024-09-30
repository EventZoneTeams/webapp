import Header from "@/components/shared/Header";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto mt-16 w-[900px] py-4">
      <Header />
      {children}
    </div>
  );
}
