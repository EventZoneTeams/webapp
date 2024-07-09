import { getEventProduct, GetEventProductsSendData } from "@/api/event-product";
import { useEventProductStore } from "@/stores/event-product";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export default function useEventProduct() {
  const { queryObj, setQueryObj } = useEventProductStore();
  const [trigger, setTrigger] = useState<boolean>(false);
  const swtichTrigger = () => {
    setTrigger(!trigger);
  };
  const getEventProductMutation = useMutation({
    mutationFn: (data: GetEventProductsSendData) => getEventProduct(data),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    getEventProductMutation.mutate(queryObj);
  }, [queryObj, trigger]);
  return {
    queryObj,
    setQueryObj,
    trigger,
    swtichTrigger,
    getEventProductMutation,
  };
}
