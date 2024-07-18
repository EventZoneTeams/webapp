"use client";

import AddEventProductForm from "@/app/dashboard/@organizer/my-events/[id]/products/components/AddEventProductForm";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useEventProduct from "@/hooks/useEventProduct";
import {CirclePlus} from "lucide-react";

export default function AddEventProductButton() {
    const {isCreateDialogOpen, setIsCreateDialogOpen} = useEventProduct();
    return (
        <Dialog open={isCreateDialogOpen}>
            <DialogTrigger>
                <Button
                    variant={"default"}
                    className="flex items-center gap-2"
                    onClick={() => {
                        setIsCreateDialogOpen(true);
                    }}
                >
                    <CirclePlus size={20}/>
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] bg-secondary-background">
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogDescription>Add a product to the event</DialogDescription>
                </DialogHeader>
                <AddEventProductForm/>
                <DialogFooter>
                    <Button
                        variant={"secondary"}
                        onClick={() => {
                            setIsCreateDialogOpen(false);
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
