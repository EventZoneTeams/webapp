"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Toaster, toast } from "sonner";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Toaster position="top-center" richColors />
    </div>
  );
}
