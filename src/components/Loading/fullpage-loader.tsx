import { Spinner } from "@/components/Loading/spinner";
import React from "react";

export default function FullpageLoader() {
  return (
    <div className=" w-full flex items-center justify-center min-h-[calc(100vh_-_theme(spacing.20))]">
      <div>
        <div className="flex items-center justify-center">
          <Spinner size={"large"} />
        </div>
        <div className="text-center mt-4 text-primary">Loading...</div>
      </div>
    </div>
  );
}
