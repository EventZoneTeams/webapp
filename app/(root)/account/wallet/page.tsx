"use client";

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { History, ArrowUpRight, ArrowDownRight, Clock, Wallet as WalletIcon } from 'lucide-react'
import { Transaction, Wallet as WalletType } from '@/types/wallet'
import { Wallet } from '@/lib/api/wallet'
import { cn } from '@/lib/utils'
import PersonalBalance from '../components/PersonalBalance'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function WalletPage() {
  const [wallets, setWallets] = useState<WalletType[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [withdrawalRequests, setWithdrawalRequests] = useState<any[]>([])
  const router = useRouter()

  const fetchUserWallets = useCallback(async () => {
    try {
      const response = await Wallet.getUserWallets()
      if (response.isSuccess) {
        setWallets(response.data || [])
      } else {
        toast.error(response.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }, [])

  const fetchWalletTransactions = useCallback(async () => {
    try {
      const response = await Wallet.getWalletTransactions({
        walletTypeEnums: 'ALL',
      })
      if (response.isSuccess) {
        const sortedTransactions = (response.data || []).sort(
          (a, b) =>
            new Date(b.transactionDate).getTime() -
            new Date(a.transactionDate).getTime()
        )
        setTransactions(sortedTransactions)
      } else {
        toast.error(response.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }, [])

  const fetchWithdrawalRequests = useCallback(async () => {
    try {
      const response = await Wallet.getWithdrawalRequests()
      if (response.isSuccess) {
        setWithdrawalRequests(response.data || [])
      } else {
        toast.error(response.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }, [])

  const handleCompleteTransaction = useCallback(
    async (transactionId: number) => {
      try {
        const response = await Wallet.completePendingTransaction(transactionId)
        if (response.isSuccess) {
          if (typeof response.data === 'string' && response.data) {
            router.push(response.data)
          }
          fetchWalletTransactions()
        } else {
          toast.error(response.message)
        }
      } catch (error: any) {
        toast.error(error.message || 'Something went wrong')
      }
    },
    [router, fetchWalletTransactions]
  )

  useEffect(() => {
    fetchUserWallets()
    fetchWalletTransactions()
    fetchWithdrawalRequests()
  }, [fetchUserWallets, fetchWalletTransactions, fetchWithdrawalRequests])


  return (
    <div className="mx-auto">
      <div className="space-y-4">
        <PersonalBalance wallets={wallets} />

        <Card className="border-none bg-transparent p-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Transaction History
            </CardTitle>
            <CardDescription>Your recent transactions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3 bg-primary/5">
                <TabsTrigger value="all" className="rounded">
                  All
                </TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <TransactionList
                  transactions={transactions}
                  handleCompleteTransaction={handleCompleteTransaction}
                />
              </TabsContent>
              <TabsContent value="deposits">
                <TransactionList
                  transactions={transactions.filter(
                    (t) => t.transactionType === "DEPOSIT",
                  )}
                  handleCompleteTransaction={handleCompleteTransaction}
                />
              </TabsContent>
              <TabsContent value="withdrawals">
                <TransactionList
                  transactions={withdrawalRequests}
                  // {transactions.filter((t) => t.transactionType === 'WITHDRAWAL')}
                  handleCompleteTransaction={handleCompleteTransaction}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TransactionList({
  transactions,
  handleCompleteTransaction,
}: {
  transactions: Transaction[];
  handleCompleteTransaction: (id: number) => void;
}) {
  return (
    <ScrollArea className="h-[400px] p-4">
      {transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={cn(
                "flex items-center justify-between rounded-lg bg-primary/5 p-4",
              )}
            >
              <div className="flex items-center gap-4">
                {transaction.transactionType === "DEPOSIT" ? (
                  <ArrowUpRight className="h-6 w-6 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-6 w-6 text-red-600" />
                )}
                <div>
                  <p className="font-semibold">
                    {transaction.transactionType === "DEPOSIT" ? "+" : "-"}
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.transactionDate).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-xs font-semibold",
                    transaction.status === "SUCCESS" &&
                      "bg-green-200 text-green-800",
                    transaction.status === "FAILED" &&
                      "bg-red-200 text-red-800",
                    transaction.status === "PENDING" &&
                      "bg-blue-200 text-blue-800",
                  )}
                >
                  {transaction.status}
                </span>
                {/* {transaction.status === "PENDING" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCompleteTransaction(transaction.id)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Complete
                  </Button>
                )} */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">No transactions found</p>
        </div>
      )}
    </ScrollArea>
  );
}
