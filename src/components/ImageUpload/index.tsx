import { Input } from "@/components/ui/input";
import NextImage from "next/image";
import React, { useEffect, useRef } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImageUpload({
  ratio,
  setImage,
  image,
  deleteImage,
}: {
  ratio: number;
  setImage: (file: File) => void;
  deleteImage: () => void;
  image: File | null;
}) {
  const [file, setFile] = React.useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      cropImageToAspect(file);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    deleteImage();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const cropImageToAspect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const aspectRatio = ratio;
        let { width, height } = img;
        let newWidth, newHeight;

        if (width / height > aspectRatio) {
          // Wider than the desired aspect ratio
          newHeight = height;
          newWidth = height * aspectRatio;
        } else {
          // Taller than the desired aspect ratio
          newWidth = width;
          newHeight = width / aspectRatio;
        }

        const startX = (width - newWidth) / 2;
        const startY = (height - newHeight) / 2;

        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(
          img,
          startX,
          startY,
          newWidth,
          newHeight,
          0,
          0,
          newWidth,
          newHeight
        );

        canvas.toBlob((blob) => {
          if (!blob) return;

          const croppedFile = new File([blob], file.name, {
            type: "image/png",
          });
          setImage(croppedFile);
        }, "image/png");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full space-y-4 ">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        placeholder="Upload Image"
        multiple={false}
        className="hover:cursor-pointer"
        ref={inputRef}
      />
      <div>
        {image ? (
          <div className="w-full h-full relative group aspect-video">
            <NextImage
              src={URL.createObjectURL(image)}
              alt="preview"
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-sm"
            />
            <div className="absolute top-0 w-full h-full flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-md">
              <Button
                variant={"outline"}
                type="button"
                onClick={handleFileRemove}
              >
                <Trash />
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative group border rounded-md aspect-video flex justify-center items-center">
            <p className="text-border">16x9</p>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
