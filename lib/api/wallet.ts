import { axiosInstance } from "@/lib/api";
import { Transaction, Wallet, WalletType } from "@/types/wallet";

// Get user wallets
export type GetUserWalletResponse = {
  isSuccess: boolean;
  data: Wallet[];
  message: string;
};

export const getUserWallets = async (): Promise<GetUserWalletResponse> => {
  try {
    const response = (
      await axiosInstance.get<GetUserWalletResponse>(`/wallets`)
    ).data;
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch wallets");
  }
};

// Get wallet transactions
export type GetWalletTransactionsSendData = {
  walletTypeEnums: WalletType;
};
export type GetWalletTransactionsResponse = {
  isSuccess: boolean;
  data: Transaction[];
  message: string;
};

export const getWalletTransactions = async (
  data: GetWalletTransactionsSendData,
): Promise<GetWalletTransactionsResponse> => {
  try {
    const response = (
      await axiosInstance.get<GetWalletTransactionsResponse>(
        `/wallets/transactions?walletTypeEnums=${data.walletTypeEnums}`,
      )
    ).data;
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch transactions",
    );
  }
};

// Add deposit
export type AddDepositSendData = {
  amount: number;
};
export type AddDepositResponse = {
  isSuccess: boolean;
  data: string;
  message: string;
};

export const addDeposit = async (
  data: AddDepositSendData,
): Promise<AddDepositResponse> => {
  try {
    const response = (
      await axiosInstance.post<AddDepositResponse>(`/wallets/transactions`, {
        amount: data.amount,
      })
    ).data;
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to add deposit");
  }
};

// Complete Pending Transaction
export type CompletePendingTransactionResponse = {
  isSuccess: boolean;
  data: string;
  message: string;
};

export const completePendingTransaction = async (
  transactionId: number,
): Promise<CompletePendingTransactionResponse> => {
  try {
    const response = (
      await axiosInstance.post<CompletePendingTransactionResponse>(
        `/payment/${transactionId}/complete-pending`,
      )
    ).data;
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to complete transaction",
    );
  }
};

// Purchase Order
export interface PurchaseOrderResponse {
  isSuccess: boolean;
  message: string;
  data: Transaction;
}

export const purchaseOrder = async (
  orderId: number,
): Promise<PurchaseOrderResponse> => {
  try {
    const response = (
      await axiosInstance.post<PurchaseOrderResponse>(
        `payment/event-orders/${orderId}`,
      )
    ).data;
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to purchase order",
    );
  }
};
