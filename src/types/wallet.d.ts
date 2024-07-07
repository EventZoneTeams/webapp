export type WalletType = "PERSONAL" | "ORGANIZATIONAL" | "ALL";
export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "PURCHASE";
export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";

export type Wallet = {
  id: number;
  userId: number;
  walletType: WalletType;
  balance: number;
};

export type BackEndWallet = {
  id: number;
  "user-id": number;
  "wallet-type": WalletType;
  balance: number;
};

export type Transaction = {
  id: number;
  walletId: number;
  transactionType: TransactionType;
  amount: number;
  description: string;
  transactionDate: Date;
  status: TransactionStatus;
};

export type BackEndTransaction = {
  id: number;
  "wallet-id": number;
  "transaction-type": TransactionType;
  amount: number;
  description: string;
  "transaction-date": Date;
  status: TransactionStatus;
};
