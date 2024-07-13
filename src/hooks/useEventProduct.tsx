import {
  createEventProduct,
  CreateEventProductSendData,
  getEventProduct,
  GetEventProductsSendData,
  deleteEventProducts,
} from "@/api/event-product";
import { useEventProductStore } from "@/stores/event-product";
import { useMutation } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useEventProduct() {
  const {
    queryObj,
    setQueryObj,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    trigger,
    switchTrigger,
  } = useEventProductStore();

  const getEventProductMutation = useMutation({
    mutationFn: (data: GetEventProductsSendData) => getEventProduct(data),
    onSuccess: (data) => {},
  });

  const createEventProductMutation = useMutation({
    mutationFn: (data: CreateEventProductSendData) => createEventProduct(data),
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message);
        setIsCreateDialogOpen(false);
        switchTrigger();
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteEventProductsMutation = useMutation({
    mutationFn: (product: number) => deleteEventProducts(product),
    onSuccess: (data) => {
      if (data.status) {
        toast.success("Delete product successfully");
        switchTrigger();
      }
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    getEventProductMutation.mutate(queryObj);
  }, [queryObj, trigger]);
  return {
    queryObj,
    setQueryObj,
    trigger,
    switchTrigger,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    getEventProductMutation,
    createEventProductMutation,
    deleteEventProductsMutation,
  };
}
