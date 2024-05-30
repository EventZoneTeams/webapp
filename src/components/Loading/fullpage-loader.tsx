import Spinner from "@/components/Loading/spinner";
import React from "react";

export default function FullpageLoader() {
  return (
    <div className=" w-full flex items-center justify-center min-h-[calc(100vh_-_theme(spacing.20))]">
      Loading...
    </div>
  );
}
