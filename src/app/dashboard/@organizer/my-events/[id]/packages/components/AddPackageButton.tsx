"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import useEventPackage from "@/hooks/useEventPackage";
import AddPackageForm from "@/app/dashboard/@organizer/my-events/[id]/packages/components/AddPackageForm";

export default function AddPackageButton({
  params,
}: {
  params: { id: string };
}) {
  const { isCreateDialogOpen, setIsCreateDialogOpen } = useEventPackage();
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
          <CirclePlus size={20} />
          Add Package
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] bg-secondary-background">
        <DialogHeader>
          <DialogTitle>Add Package</DialogTitle>
          <DialogDescription>Add Package</DialogDescription>
        </DialogHeader>
        <AddPackageForm params={params} />
        <DialogFooter>
          <Button
            variant={"secondary"}
            className="w-full"
            onClick={() => {
              setIsCreateDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
