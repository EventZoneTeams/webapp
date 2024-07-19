import {
  addDeposit,
  AddDepositSendData,
  completePendingTransaction,
  getUserWallets,
  getWalletTransactions,
  GetWalletTransactionsSendData,
  purchaseOrder,
} from "@/api/wallet";
import useAuth from "@/hooks/useAuth";
import { useWalletStore } from "@/stores/wallet";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function useWallet() {
  const { authUser } = useAuth();
  const { wallets, transactions, setTransaction, setWallet } = useWalletStore();
  const router = useRouter();
  const getUserWalletMutation = useMutation({
    mutationFn: () => getUserWallets(),
    onSuccess: (data) => {
      if (data.success) {
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
      if (data.success) {
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
      if (data.success) {
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
      if (data.success) {
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
      Swal.fire({
        icon: "success",
        title: "Successfully",
        text: "Payment is successfully!",
        confirmButtonText: "OK",
        confirmButtonColor: "#30a5e8",
      }).then((result) => {
        window.location.reload();
      });
    },
  });

  useEffect(() => {
    if (authUser) {
      Promise.all([
        getUserWalletMutation.mutateAsync(),
        getWalletTransactionsMutation.mutateAsync({
          walletTypeEnums: "ALL",
        }),
      ]);
    }
  }, [authUser]);

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
