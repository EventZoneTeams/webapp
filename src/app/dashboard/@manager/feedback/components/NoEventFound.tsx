import React from "react";
import { Card } from "@/components/ui/card";
import { Ban } from "lucide-react";

export default function NoEventFound() {
  return (
    <div className="flex gap-2 h-[calc(100vh_-_theme(spacing.28))] w-full relative items-center justify-center">
      <div className="grid place-content-center">
        <h1 className="uppercase tracking-widest text-gray-500">
          404 | No Event Found
        </h1>
      </div>
    </div>
  );
}
