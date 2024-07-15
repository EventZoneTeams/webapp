"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddBalanceForm from "@/app/profile/components/AddBalanceForm";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DialogClose } from "@radix-ui/react-dialog";
import useWallet from "@/hooks/useWallet";

export default function PersonalBalance() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { wallets } = useWallet();
  return (
    <div>
      <div className="p-4 rounded-md border bg-secondary">
        <p className="text-lg font-bold flex items-center gap-2">
          <span className="flex-1">Balance </span>
          <span className="text-base font-normal text-gray-500">(VND)</span>
        </p>
        <p className="mt-3 text-2xl font-extrabold">
          {wallets &&
            wallets.length > 0 &&
            Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(wallets[0].balance)}
        </p>
        <div className="flex justify-end items-center">
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <IoIosAddCircleOutline className="mr-2" size={24} />
            Add
          </Button>
        </div>
      </div>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Add balance
            </DialogTitle>
          </DialogHeader>
          <AddBalanceForm walletType="PERSONAL" />
          <DialogClose asChild>
            <Button
              variant={"secondary"}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
