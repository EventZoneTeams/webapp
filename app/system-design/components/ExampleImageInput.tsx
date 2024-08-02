"use client";

import { ImageCropper } from "@/components/input/ImageInput";
import { useState } from "react";

export default function ExampleImageInput() {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  return (
    <div className="grid grid-cols-3 items-center gap-6">
      <ImageCropper ratio="1:1" setFinalImage={setImage1} />
      <ImageCropper ratio="16:9" setFinalImage={setImage2} />
      <ImageCropper ratio="round" setFinalImage={setImage3} />
    </div>
  );
}
