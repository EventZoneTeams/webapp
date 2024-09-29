"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import PersonalBalance from "../components/PersonalBalance";
import {
  getUserWallets,
  getWalletTransactions,
  completePendingTransaction,
} from "@/lib/api/wallet";
import { cn } from "@/lib/utils";
import { History } from "lucide-react";
import { Transaction, Wallet } from "@/types/wallet";

export default function WalletPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchUserWallets = async () => {
      try {
        const response = await getUserWallets();
        if (response.isSuccess) {
          setWallets(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const fetchWalletTransactions = async () => {
      try {
        const response = await getWalletTransactions({
          walletTypeEnums: "ALL",
        });
        if (response.isSuccess) {
          setTransactions(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchUserWallets();
    fetchWalletTransactions();
  }, []);

  const handleCompleteTransaction = async (transactionId: number) => {
    try {
      const response = await completePendingTransaction(transactionId);
      if (response.isSuccess) {
        toast.success("Transaction completed successfully");
        setTransactions((prev) =>
          prev.filter((transaction) => transaction.id !== transactionId),
        );
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4 bg-background pb-5">
      <div className="col-span-2">
        <PersonalBalance wallets={wallets} /> {/* Pass the wallets prop */}
      </div>
      <div className="col-span-3 space-y-4">
        <div className="flex items-center gap-2 rounded-md bg-secondary p-2 text-lg">
          <History />
          Transaction history
        </div>
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={cn(
                "rounded-md p-4",
                transaction.status === "SUCCESS" &&
                  "bg-green-100 text-green-800",
                transaction.status === "FAILED" && "bg-red-100 text-red-800",
                transaction.status === "PENDING" && "bg-blue-100 text-blue-800",
              )}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 text-lg font-semibold">
                  {transaction.transactionType === "DEPOSIT" ? "+" : "-"}
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(transaction.amount)}
                </div>
                <div className="text-base font-semibold">
                  {transaction.status}
                </div>
              </div>

              <div className="text-sm italic">
                <p>{transaction.transactionType}</p>
                <div className="flex items-center gap-4">
                  <p className="flex-1">
                    {new Date(transaction.transactionDate).toLocaleString()}
                  </p>
                  {transaction.status === "PENDING" && (
                    <p
                      onClick={() => handleCompleteTransaction(transaction.id)}
                      className="cursor-pointer text-blue-500 underline underline-offset-2"
                    >
                      Complete transaction
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-md bg-gray-100 p-4 text-gray-800">
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
}
