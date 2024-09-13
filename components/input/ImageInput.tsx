"use client";

import { useCallback, useRef, useState, type SyntheticEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

import { cn } from "@/lib/utils";
import { BanIcon, CropIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { FileWithPath, useDropzone } from "react-dropzone";
import { FileWithPreview, Ratios } from "@/types/imageInput";

const accept = {
  "image/*": [],
};

interface ImageCropperProps {
  ratio: Ratios;
  setFinalImage: (image: File) => void;
  defaultImage?: string;
}

export function ImageCropper({
  ratio = "1:1",
  setFinalImage,
  defaultImage,
}: ImageCropperProps) {
  const aspect = getAspectRatio(ratio);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null,
  );
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert("Selected image is too large!");
      return;
    }

    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    setSelectedFile(fileWithPreview);
    setDialogOpen(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onCropComplete(crop: PixelCrop) {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  }

  function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      );
    }

    return canvas.toDataURL("image/webp", 0.7);
  }

  async function onCrop() {
    try {
      setCroppedImage(croppedImageUrl);
      const blob = await fetch(croppedImageUrl).then((r) => r.blob());
      const file = new File([blob], "cropped-image.webp", {
        type: "image/webp",
      });
      setFinalImage(file);
      setDialogOpen(false);
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  return (
    <div className={cn("w-full", getAspectRatioClass(ratio))}>
      <Dialog open={isDialogOpen}>
        <DialogTitle></DialogTitle>
        {selectedFile ? (
          <div
            className={cn(
              "w-full overflow-hidden rounded outline outline-offset-2 outline-gray-300 hover:cursor-pointer hover:outline-gray-400",
              getAspectRatioClass(ratio),
            )}
            onClick={() => setDialogOpen(true)}
          >
            <Image
              src={croppedImage ? croppedImage : selectedFile?.preview}
              alt="Selected Image"
              width={1000}
              height={1000}
              className={cn(
                "w-full object-cover object-center",
                getAspectRatioClass(ratio),
              )}
            />
          </div>
        ) : defaultImage ? (
          <div
            className={cn(
              "w-full overflow-hidden rounded outline outline-offset-2 outline-gray-300 hover:cursor-pointer hover:outline-gray-400",
              getAspectRatioClass(ratio),
            )}
            {...getRootProps()}
          >
            <Image
              src={defaultImage}
              alt="Selected Image"
              width={1000}
              height={1000}
              className={cn(
                "w-full object-cover object-center",
                getAspectRatioClass(ratio),
              )}
            />
            <input {...getInputProps()} />
          </div>
        ) : (
          <div
            className={cn(
              "flex w-full items-center justify-center rounded bg-white p-5 outline-dashed outline-offset-2 outline-gray-300",
              getAspectRatioClass(ratio),
            )}
            {...getRootProps()}
          >
            <div className="flex select-none flex-col items-center gap-4 text-gray-400">
              <UploadIcon className={cn("size-8")} />
              <p className="text-center">Drag and drop or click here</p>
            </div>
            <input {...getInputProps()} />
          </div>
        )}

        <DialogContent className="gap-0 p-0">
          <div className="size-full p-6">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => onCropComplete(c)}
              aspect={aspect}
              className="w-full"
            >
              <div>
                <Image
                  ref={imgRef}
                  className="rounded-none"
                  alt="Image Cropper Shell"
                  src={selectedFile?.preview}
                  onLoad={onImageLoad}
                  width={500}
                  height={500}
                />
              </div>
            </ReactCrop>
          </div>
          <div className="flex w-full items-center justify-end gap-4 p-6 pt-0">
            <Button
              size={"sm"}
              type="reset"
              className="w-fit"
              variant={"outline"}
              onClick={() => {
                setDialogOpen(false);
                setSelectedFile(null);
              }}
            >
              <BanIcon className="mr-1.5 size-4" />
              Delete
            </Button>
            <Button
              type="submit"
              size={"sm"}
              className="w-fit"
              onClick={onCrop}
            >
              <CropIcon className="mr-1.5 aspect-square size-4" />
              Crop
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper function to center the crop
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
        height: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

//get tailwind class base on aspect ratio
function getAspectRatioClass(ratio: Ratios): string {
  switch (ratio) {
    case "16:9":
      return "aspect-video";
    case "1:1":
      return "aspect-square";
    case "round":
      return "aspect-square rounded-full";
    default:
      return "aspect-square";
  }
}

function getAspectRatio(ratio: Ratios): number {
  switch (ratio) {
    case "1:1":
      return 1;
    case "16:9":
      return 16 / 9;
    case "round":
      return 1;
    default:
      return 1;
  }
}
