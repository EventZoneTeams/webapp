import { axiosInstance } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  Transaction,
  Wallet as WalletType,
  WalletType as WalletTypeEnum,
  WithdrawalRequest,
} from "@/types/wallet";

export namespace Wallet {
  // Get user wallets
  export async function getUserWallets(): Promise<ApiResponse<WalletType[]>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<WalletType[]>>("/wallets")
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: response.message,
          data: response.data,
        };
      } else {
        return {
          isSuccess: false,
          message: response.message,
          data: [],
        };
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message || "Failed to fetch wallets",
        data: [],
      };
    }
  }

  // Get wallet transactions
  export type GetWalletTransactionsSendData = {
    walletTypeEnums: WalletTypeEnum;
  };

  export async function getWalletTransactions(
    data: GetWalletTransactionsSendData,
  ): Promise<ApiResponse<Transaction[]>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<Transaction[]>>(
          `/wallets/transactions?walletTypeEnums=${data.walletTypeEnums}`,
        )
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: response.message,
          data: response.data,
        };
      } else {
        return {
          isSuccess: false,
          message: response.message,
          data: [],
        };
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message || "Failed to fetch transactions",
        data: [],
      };
    }
  }

  // Add deposit
  export type AddDepositSendData = {
    amount: number;
  };

  // export async function addDeposit(
  //   data: AddDepositSendData,
  // ): Promise<ApiResponse<string>> {
  //   try {
  //     const response = (
  //       await axiosInstance.post<ApiResponse<string>>("/wallets/transactions", {
  //         amount: data.amount,
  //       })
  //     ).data;

  //     if (response.isSuccess) {
  //       return {
  //         isSuccess: true,
  //         message: "Deposit added successfully",
  //         data: response.data,
  //       };
  //     } else {
  //       return {
  //         isSuccess: false,
  //         message: response.message,
  //         data: "",
  //       };
  //     }
  //   } catch (error: any) {
  //     return {
  //       isSuccess: false,
  //       message: error.message || "Failed to add deposit",
  //       data: "",
  //     };
  //   }
  // }

  export async function addDepositPayos(
    data: AddDepositSendData,
  ): Promise<ApiResponse<string>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<string>>(
          "/create-payment-link-payos",
          {
            amount: data.amount,
          },
        )
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: "Deposit added successfully",
          data: response.data,
        };
      } else {
        return {
          isSuccess: false,
          message: response.message,
          data: "",
        };
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message || "Failed to add deposit",
        data: "",
      };
    }
  }

  // Complete pending transaction
  export async function completePendingTransaction(
    transactionId: number,
  ): Promise<ApiResponse<string>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<string>>(
          `/payment/${transactionId}/complete-pending`,
        )
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: "Transaction completed successfully",
          data: response.data,
        };
      } else {
        return {
          isSuccess: false,
          message: response.message,
          data: "",
        };
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message || "Failed to complete transaction",
        data: "",
      };
    }
  }

  // Get withdrawal requests
  export async function getWithdrawalRequests(): Promise<
    ApiResponse<WithdrawalRequest[]>
  > {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<WithdrawalRequest[]>>(
          "/WithdrawnRequest/GetListByUserId",
        )
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: response.message,
          data: response.data,
        };
      } else {
        return {
          isSuccess: false,
          message: response.message,
          data: [],
        };
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message || "Failed to fetch withdrawal requests",
        data: [],
      };
    }
  }

  // Create withdrawal request
  export type CreateWithdrawalRequestData = {
    amount: number;
    bankNote: string;
  };

  export async function createWithdrawalRequest(
    data: CreateWithdrawalRequestData,
  ): Promise<ApiResponse<string>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<string>>(
          "/WithdrawnRequest/CreateRequest",
          data,
        )
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: "Withdrawal request created successfully",
          data: response.data,
        };
      } else {
        return {
          isSuccess: false,
          message: response.message,
          data: "",
        };
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message || "Failed to create withdrawal request",
        data: "",
      };
    }
  }
}
