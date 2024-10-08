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
import { VnDong } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

interface PersonalBalanceProps {
  wallets: Wallet[];
}

const PersonalBalance: React.FC<PersonalBalanceProps> = ({ wallets }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  console.log(wallets);

  return (
    <div>
      <div className="space-y-2 rounded-md border-none bg-primary/5 p-4">
        <Badge>{wallets && wallets.length > 0 && wallets[0].walletType}</Badge>
        <p className="flex-1 text-sm text-primary/50">Balance (VND) </p>
        <p className="mt-3 text-4xl font-semibold">
          {wallets && wallets.length > 0 && VnDong.format(wallets[0].balance)}
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
        <DialogContent className="border-none">
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
