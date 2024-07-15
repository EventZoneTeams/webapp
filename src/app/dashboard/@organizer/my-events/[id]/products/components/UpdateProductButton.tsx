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
import UpdateProductForm from "@/app/dashboard/@organizer/my-events/[id]/products/components/UpdateProductForm";

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
        <DialogContent className="bg-secondary-background">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              You can edit the product details here.
            </DialogDescription>
          </DialogHeader>
          <UpdateProductForm productId={productId} />
          <DialogFooter>
            <Button
              className="w-full"
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
