"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import AddBalanceForm from "./AddBalanceForm";
import WithdrawalForm from "./WithdrawalForm";
import { Button } from "@/components/ui/button";
import { Wallet } from "@/types/wallet"; // Assuming you have this type defined
import { CirclePlus, Wallet as WalletIcon } from "lucide-react";
import { VnDong } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

interface PersonalBalanceProps {
  wallets: Wallet[];
}

const PersonalBalance: React.FC<PersonalBalanceProps> = ({ wallets }) => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false);

  const handleWithdrawalSuccess = () => {
    setIsWithdrawalDialogOpen(false);
    // Add logic to refresh wallet data, if needed
  };

  return (
    <div>
      <div className="space-y-2 rounded-md border-none bg-primary/5 p-4">
        <Badge>{wallets && wallets.length > 0 && wallets[0].walletType}</Badge>
        <div>
          <p className="flex-1 text-sm text-primary/50">Balance (VND)</p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-center text-4xl font-semibold">
              {wallets &&
                wallets.length > 0 &&
                VnDong.format(wallets[0].balance)}
            </p>

            <div className="flex gap-2">
              {/* Withdraw Button */}
              <Dialog
                open={isWithdrawalDialogOpen}
                onOpenChange={setIsWithdrawalDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant={"secondary"} className="w-[120px]">
                    <WalletIcon className="mr-2 h-4 w-4" />
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                    <DialogDescription>
                      Enter the amount you wish to withdraw and any necessary
                      bank details.
                    </DialogDescription>
                  </DialogHeader>
                  <WithdrawalForm onSuccess={handleWithdrawalSuccess} />
                </DialogContent>
              </Dialog>

              {/* Deposit Button */}
              <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
                <DialogTrigger asChild>
                  <Button className="w-[120px]">
                    <CirclePlus className="mr-2 h-4 w-4" />
                    Deposit
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-none">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                      Deposit
                    </DialogTitle>
                  </DialogHeader>
                  <AddBalanceForm walletType="PERSONAL" />
                  <DialogClose asChild>
                    <Button
                      variant={"secondary"}
                      onClick={() => {
                        setIsDepositOpen(false);
                      }}
                    >
                      Close
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalBalance;
