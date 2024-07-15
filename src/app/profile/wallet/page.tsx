"use client";

import PersonalBalance from "@/app/profile/components/PersonalBalance";
import useWallet from "@/hooks/useWallet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaHistory } from "react-icons/fa";

export default function page() {
  const { transactions, completePendingTransactionMutation } = useWallet();
  return (
    <div className="bg-background grid grid-cols-5 gap-4 pb-5">
      <div className="col-span-2 ">
        <PersonalBalance />
      </div>
      <div className="col-span-3 space-y-4">
        <div className="text-lg bg-secondary rounded-md p-2 flex items-center gap-2">
          <FaHistory className="" />
          Transaction history
        </div>
        {/* {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="p-4 rounded-md bg-green-100 text-green-800"
          >
            <div className="text-lg font-semibold">
              +
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(500000)}
            </div>
            <div className="italic text-sm">
              <p>Deposit</p>
              <p>23/12/2003 15:38</p>
            </div>
          </div>
        ))}
        <div className="p-4 rounded-md bg-red-100 text-red-800">
          <div className="text-lg font-semibold">
            -
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(500000)}
          </div>
          <div className="italic text-sm">
            <p>Deposit</p>
            <p>23/12/2003 15:38</p>
          </div>
        </div> */}
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={cn(
                "p-4 rounded-md",
                transaction.status === "SUCCESS" &&
                  "bg-green-100 text-green-800",
                transaction.status === "FAILED" && "bg-red-100 text-red-800",
                transaction.status === "PENDING" && "bg-blue-100 text-blue-800"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold flex-1">
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

              <div className="italic text-sm">
                <p>{transaction.transactionType}</p>

                <div className="flex items-center gap-4">
                  <p className="flex-1">
                    {new Date(transaction.transactionDate).toLocaleString()}
                  </p>
                  {transaction.status === "PENDING" && (
                    <p
                      onClick={() => {
                        completePendingTransactionMutation.mutate(
                          transaction.id
                        );
                      }}
                      className="text-blue-500 underline underline-offset-2 cursor-pointer"
                    >
                      Complete transaction
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 rounded-md bg-gray-100 text-gray-800">
            No transaction
          </div>
        )}
      </div>
    </div>
  );
}
