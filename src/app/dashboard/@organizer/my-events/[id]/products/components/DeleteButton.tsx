"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useEventProduct from "@/hooks/useEventProduct";
import { Trash2 } from "lucide-react";
import React from "react";

export default function DeleteButton({ productId }: { productId: number }) {
  const [open, setOpen] = React.useState(false);
  const { deleteEventProductsMutation } = useEventProduct();
  const handleDeleteProduct = () => {
    deleteEventProductsMutation.mutate(productId);
  };
  return (
    <>
      <Button
        className="flex gap-2 text-red-800 bg-red-200 hover:bg-red-300"
        variant={"secondary"}
        onClick={() => setOpen(true)}
      >
        <Trash2 size={20} />
        Delete
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this product?
            </DialogTitle>
          </DialogHeader>
          <div>
            You're about to delete this product.{" "}
            <span className="text-red-500">This action cannot be undone.</span>
          </div>
          <DialogFooter>
            <Button
              className="flex gap-2 text-red-800 bg-red-200 hover:bg-red-300"
              variant={"secondary"}
              onClick={handleDeleteProduct}
              disabled={deleteEventProductsMutation.isPending}
            >
              {deleteEventProductsMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
            <Button
              className="flex gap-2 text-gray-800 bg-gray-200 hover:bg-gray-300"
              variant={"secondary"}
              onClick={() => setOpen(false)}
              disabled={deleteEventProductsMutation.isPending}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
