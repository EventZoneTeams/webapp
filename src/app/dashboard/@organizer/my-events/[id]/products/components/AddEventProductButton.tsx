"use client";

import AddEventProductForm from "@/app/dashboard/@organizer/my-events/[id]/products/components/AddEventProductForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";

export default function AddEventProductButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <Button
          variant={"default"}
          className="flex items-center gap-2"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <CirclePlus size={20} />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Add a product to the event</DialogDescription>
        </DialogHeader>
        <AddEventProductForm />
        <DialogFooter>
          <Button
            variant={"secondary"}
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
