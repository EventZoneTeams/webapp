"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, X } from "lucide-react";
import { ImageCropper } from "@/components/input/ImageInput";
import { Image } from "@/lib/api/image";
import { axiosInstance } from "@/lib/api";

interface AddPostDialogProps {
  eventId: string;
}

export function AddPostDialog({ eventId }: AddPostDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    const imageUrl = await Image.uploadImage(image);
    setImageUrls([...imageUrls, imageUrl]);
    const response = await axiosInstance.post("/event-posts", {
      eventId,
      title,
      body,
      imageUrls: [...imageUrls, imageUrl],
    });
    if (response.status === 201) {
      setOpen(false);
      resetForm();
    }
    setOpen(false);
    resetForm();
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTitle("");
    setBody("");
    setImageUrls([]);
    setCurrentImageUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Add Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              placeholder="Enter body"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image</Label>
            <div className="flex space-x-2">
              <ImageCropper
                ratio="16:9"
                setFinalImage={setImage}
                className="rounded-xl border bg-background/50 outline-none"
              />
            </div>
          </div>
          {imageUrls.length > 0 && (
            <div className="space-y-2">
              <Label>Added Images</Label>
              <ul className="space-y-2">
                {imageUrls.map((url, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="max-w-[300px] truncate">{url}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImageUrl(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button type="submit" className="w-full">
            Create Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
