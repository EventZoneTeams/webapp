import React from "react";

export default function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <p>{message}</p>
    </div>
  );
}
