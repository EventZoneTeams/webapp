import {
  BackEndTransaction,
  BackEndWallet,
  Transaction,
  Wallet,
} from "@/types/wallet";

export const mapBackEndWalletToWallet = (
  backEndWallet: BackEndWallet
): Wallet => {
  return {
    id: backEndWallet.id,
    userId: backEndWallet["user-id"],
    walletType: backEndWallet["wallet-type"],
    balance: backEndWallet.balance,
  };
};

export const mapBackEndWalletsToWallets = (
  backEndWallets: BackEndWallet[]
): Wallet[] => {
  return backEndWallets.map(mapBackEndWalletToWallet);
};

export const mapBackendTransactionToTransaction = (
  transaction: BackEndTransaction
): Transaction => {
  return {
    id: transaction.id,
    walletId: transaction["wallet-id"],
    transactionType: transaction["transaction-type"],
    amount: transaction.amount,
    description: transaction.description,
    transactionDate: transaction["transaction-date"],
    status: transaction.status,
  };
};

export const mapBackendTransactionsToTransactions = (
  transactions: BackEndTransaction[]
): Transaction[] => {
  return transactions.map(mapBackendTransactionToTransaction);
};
