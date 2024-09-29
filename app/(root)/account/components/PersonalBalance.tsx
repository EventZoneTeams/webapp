"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddBalanceForm from "./AddBalanceForm";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Wallet } from "@/types/wallet"; // Assuming you have this type defined
import { CirclePlus } from "lucide-react";

interface PersonalBalanceProps {
  wallets: Wallet[];
}

const PersonalBalance: React.FC<PersonalBalanceProps> = ({ wallets }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <div className="rounded-md border bg-secondary p-4">
        <p className="flex items-center gap-2 text-lg font-bold">
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
        <div className="flex items-center justify-end">
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <CirclePlus className="mr-2" size={24} />
            Add
          </Button>
        </div>
      </div>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
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
};

export default PersonalBalance;
