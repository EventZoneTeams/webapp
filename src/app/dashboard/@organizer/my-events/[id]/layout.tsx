import MiniSidebar from "@/components/SideBar/MiniSidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Manage Event",
};

export default function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="grid grid-cols-12 border-t py-4 gap-4">
      <div className="col-span-2">
        <MiniSidebar id={params.id} />
      </div>
      <div className="col-span-10">{children}</div>
    </div>
  );
}
