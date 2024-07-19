import { axiosClient } from "@/api/axiosClient";
import {
  mapBackendTransactionsToTransactions,
  mapBackendTransactionToTransaction,
  mapBackEndWalletsToWallets,
} from "@/lib/wallet";
import {
  BackEndTransaction,
  BackEndWallet,
  TransactionType,
  Wallet,
  WalletType,
} from "@/types/wallet";

//Get user wallets
export type GetUserWalletResponse = {
  success: boolean;
  data: BackEndWallet[];
  message: string;
};
export const getUserWallets = async () => {
  try {
    const response = (await axiosClient.get<GetUserWalletResponse>(`/wallets`))
      .data;
    return {
      success: response.success,
      data: mapBackEndWalletsToWallets(response.data),
      message: response.message,
    };
  } catch (error) {
    throw error;
  }
};

//Get wallet transactions
export type GetWalletTransactionsSendData = {
  walletTypeEnums: WalletType;
};
export type GetWalletTransactionsResponse = {
  success: boolean;
  data: BackEndTransaction[];
  message: string;
};
export const getWalletTransactions = async (
  data: GetWalletTransactionsSendData
) => {
  try {
    const response = (
      await axiosClient.get<GetWalletTransactionsResponse>(
        `/wallets/transactions?walletTypeEnums=${data.walletTypeEnums}`
      )
    ).data;
    return {
      success: response.success,
      data: mapBackendTransactionsToTransactions(response.data),
      message: response.message,
    };
  } catch (error) {
    throw error;
  }
};

//Add deposit
export type AddDepositSendData = {
  amount: number;
};
export type AddDepositResponse = {
  success: boolean;
  data: string;
  message: string;
};
export const addDeposit = async (data: AddDepositSendData) => {
  try {
    const response = (
      await axiosClient.post<AddDepositResponse>(`/wallets/transactions`, {
        amount: data.amount,
      })
    ).data;
    return response;
  } catch (error) {
    throw error;
  }
};

//Complete Pending Transaction
export type CompletePendingTransactionResponse = {
  success: boolean;
  data: string;
  message: string;
};
export const completePendingTransaction = async (transactionId: number) => {
  try {
    const response = (
      await axiosClient.post<CompletePendingTransactionResponse>(
        `/payment/${transactionId}/complete-pending`
      )
    ).data;
    return response;
  } catch (error) {
    throw error;
  }
};

export interface PurchaseOrderResponse {
  success: boolean;
  message: string;
  data: BackEndTransaction;
}
export const purchaseOrder = async (orderId: number) => {
  try {
    const response = (
      await axiosClient.post<PurchaseOrderResponse>(
        `payment/event-orders/${orderId}`
      )
    ).data;
    return {
      success: response.success,
      message: response.message,
      data: mapBackendTransactionToTransaction(response.data),
    };
  } catch (error) {
    throw error;
  }
};
