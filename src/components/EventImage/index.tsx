"use client";

import { isValidImageUrl } from "@/lib/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function EventImage({ src }: { src: string }) {
  const [isValidImage, setIsValidImage] = useState<boolean>(false);

  useEffect(() => {
    if (src) {
      isValidImageUrl(src).then((res) => {
        setIsValidImage(res as boolean);
      });
    }
  }, [src]);
  return (
    <div className="aspect-video w-full">
      {src ? (
        isValidImage ? (
          <Image
            src={src ?? ""}
            alt={src}
            width={500}
            height={500}
            className="w-full h-full rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-secondary rounded-md flex items-center justify-center">
            <p>Invalid Image</p>
          </div>
        )
      ) : (
        <div className="w-full h-full bg-secondary rounded-md flex items-center justify-center">
          <p>No Image</p>
        </div>
      )}
    </div>
  );
}
