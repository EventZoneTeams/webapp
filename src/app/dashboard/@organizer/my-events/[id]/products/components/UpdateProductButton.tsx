import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useEventProduct from "@/hooks/useEventProduct";

export default function UpdateProductButton({
  productId,
}: {
  productId: number;
}) {
  const { isUpdateDialogOpen, setIsUpdateDialogOpen } = useEventProduct();
  return (
    <>
      <Button
        className="flex gap-2 text-blue-800 bg-blue-200 hover:bg-blue-300"
        onClick={() => setIsUpdateDialogOpen(true)}
      >
        <Pencil size={20} />
        Edit
      </Button>
      <Dialog open={isUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              You can edit the product details here.
            </DialogDescription>
          </DialogHeader>
          <div>
            You're about to delete this product.{" "}
            <span className="text-red-500">This action cannot be undone.</span>
          </div>
          <DialogFooter>
            <Button
              className="flex gap-2 text-gray-800 bg-gray-200 hover:bg-gray-300 w-full"
              variant={"secondary"}
              onClick={() => setIsUpdateDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
