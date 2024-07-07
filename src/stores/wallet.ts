import { Transaction, Wallet } from "@/types/wallet";
import { create } from "zustand";

interface WalletState {
  wallets: Wallet[] | null;
  setWallet: (wallet: Wallet[]) => void;
  transactions: Transaction[] | null;
  setTransaction: (transaction: Transaction[]) => void;
}

export const useWalletStore = create<WalletState>((set) => {
  return {
    wallets: null,
    setWallet: (wallets: Wallet[]) => set({ wallets: wallets }),
    transactions: null,
    setTransaction: (transactions: Transaction[]) => {
      //sort transactions by latest date
      transactions.sort((a, b) => {
        return (
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime()
        );
      });
      set({ transactions: transactions });
    },
  };
});
