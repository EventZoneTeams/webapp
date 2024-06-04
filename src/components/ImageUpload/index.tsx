"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreateEventStore } from "@/stores/createEvent";
import React, { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Cropper from "react-easy-crop";
import { Input } from "@/components/ui/input";
import getCroppedImg from "@/lib/getCroppedImg";
import { toast } from "react-toastify";
import { set } from "date-fns";

export function ImageUpload() {
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const { setImage, Thumbnail } = useCreateEventStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
    setIsDialogOpen(true);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        (images[0] as any)?.dataURL,
        croppedAreaPixels,
        rotation
      );
      setImage({
        dataURL: croppedImage as string,
        file: new File([croppedImage as string], "image.png"),
      });
      setImages([]);
      setIsDialogOpen(false);
      setZoom(1);
      setRotation(0);
      setCrop({ x: 0, y: 0 });
      setCroppedAreaPixels(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-full ">
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({ onImageUpload, isDragging, dragProps, errors }) => {
          // write your building UI
          useEffect(() => {
            if (errors) {
              toast.error("Error uploading image, please try again.");
            }
          }, [errors]);
          return (
            <div className="upload__image-wrapper h-full w-full ">
              <div
                className="h-full w-full flex items-center justify-center cursor-pointer border border-ring rounded-md border-dashed"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                {Thumbnail ? "Change Image" : "Click or Drag Image"}
              </div>
            </div>
          );
        }}
      </ImageUploading>

      <div
        className={cn(
          "absolute top-0 right-0 bottom-0 left-0 bg-primary-foreground/80 hidden z-40",
          {
            "flex items-center justify-center flex-col": isDialogOpen,
          }
        )}
      >
        <div className="w-1/2 h-1/2 flex flex-col gap-4">
          <div className="relative h-[400px] min-h-[400px]">
            <Cropper
              image={(images[0] as any)?.dataURL}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              style={{
                containerStyle: {
                  backgroundColor: "black",
                  borderRadius: "8px",
                  overflow: "hidden",
                },
              }}
            />
          </div>
          <div className="bg-black w-full px-6 py-4  rounded-md mx-auto grid grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <p>Zoom</p>
              <input
                type="range"
                className="w-full flex-1"
                value={zoom}
                min={1}
                max={5}
                step={0.1}
                onChange={(e) => {
                  setZoom(Number(e.target.value));
                }}
              />
              <Input
                className="w-1/4"
                type="number"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => {
                  setZoom(Number(e.target.value));
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <p>Rotate</p>
              <input
                type="range"
                className="w-full flex-1"
                value={rotation}
                min={0}
                max={180}
                step={1}
                onChange={(e) => {
                  setRotation(Number(e.target.value));
                }}
              />
              <Input
                className="w-1/4"
                type="number"
                value={rotation}
                min={0}
                max={180}
                step={1}
                onChange={(e) => {
                  setRotation(Number(e.target.value));
                }}
              />
            </div>
            <div className="flex gap-4 items-center">
              <p>X:</p>
              <Input
                className="flex-1"
                type="number"
                value={crop.x}
                onChange={(e) => {
                  setCrop({ ...crop, x: Number(e.target.value) });
                }}
              />
              <p>Y:</p>
              <Input
                className="flex-1"
                type="number"
                value={crop.y}
                onChange={(e) => {
                  setCrop({ ...crop, y: Number(e.target.value) });
                }}
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  setZoom(1);
                  setRotation(0);
                  setCrop({ x: 0, y: 0 });
                }}
              >
                Reset
              </Button>
              <Button
                variant={"outline"}
                className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  showCroppedImage();
                }}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
