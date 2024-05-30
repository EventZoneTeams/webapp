import { MyBreadcrumb } from "@/components/Breadcrumb";
import PrivateProvider from "@/providers/privateProvider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateProvider>
      <div className=" min-h-[calc(100vh_-_theme(spacing.20))] w-full container">
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </PrivateProvider>
  );
}
