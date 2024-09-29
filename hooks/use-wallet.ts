import {
  addDeposit,
  AddDepositSendData,
  completePendingTransaction,
  getUserWallets,
  getWalletTransactions,
  GetWalletTransactionsSendData,
  purchaseOrder,
} from "@/lib/api/wallet";
import { useAuthStore } from "@/stores/authStore";
import { useWalletStore } from "@/stores/walletStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function useWallet() {
  const { user } = useAuthStore();
  const { wallets, transactions, setTransaction, setWallet } = useWalletStore();
  const router = useRouter();
  const getUserWalletMutation = useMutation({
    mutationFn: () => getUserWallets(),
    onSuccess: (data) => {
      if (data.isSuccess) {
        setWallet(data.data);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getWalletTransactionsMutation = useMutation({
    mutationFn: (data: GetWalletTransactionsSendData) =>
      getWalletTransactions(data),
    onSuccess: (data) => {
      if (data.isSuccess) {
        setTransaction(data.data);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const addDepositTransactionMutation = useMutation({
    mutationFn: (data: AddDepositSendData) => addDeposit(data),
    onSuccess: (data) => {
      if (data.isSuccess) {
        router.push(data.data);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const completePendingTransactionMutation = useMutation({
    mutationFn: (transactionId: number) =>
      completePendingTransaction(transactionId),
    onSuccess: (data) => {
      if (data.isSuccess) {
        router.push(data.data);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const purchaseOrderMutation = useMutation({
    mutationFn: (orderId: number) => purchaseOrder(orderId),
    onSuccess: () => {
      // Swal.fire({
      //   icon: "isSuccess",
      //   title: "Successfully",
      //   text: "Payment is successfully!",
      //   confirmButtonText: "OK",
      //   confirmButtonColor: "#30a5e8",
      // }).then((result) => {
      //   window.location.reload();
      // });
    },
  });

  useEffect(() => {
    if (user) {
      Promise.all([
        getUserWalletMutation.mutateAsync(),
        getWalletTransactionsMutation.mutateAsync({
          walletTypeEnums: "ALL",
        }),
      ]);
    }
  }, [user]);

  return {
    wallets,
    transactions,
    getUserWalletMutation,
    getWalletTransactionsMutation,
    addDepositTransactionMutation,
    completePendingTransactionMutation,
    purchaseOrderMutation,
  };
}
