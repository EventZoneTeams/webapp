import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="m-auto mt-12 w-[820px] py-4">{children}</div>;
}
