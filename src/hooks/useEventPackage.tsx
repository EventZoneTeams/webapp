import { useMutation } from "@tanstack/react-query";
import {
  createEventPackage,
  CreateEventPackageSendData,
  getEventPackageById,
  getEventPackages,
  GetEventPackageSendData,
} from "@/api/event-package";
import { useEventPackageStore } from "@/stores/event-package";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";

export default function useEventPackage() {
  const {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    queryObj,
    setQueryObj,
    trigger,
    switchTrigger,
  } = useEventPackageStore();
  const getEventPackagesMutation = useMutation({
    mutationFn: (data: GetEventPackageSendData) => getEventPackages(data),
  });

  const createEventPackageMutation = useMutation({
    mutationFn: (data: CreateEventPackageSendData) => createEventPackage(data),
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message);
        setIsCreateDialogOpen(false);
        switchTrigger();
      }
    },
  });

  const getEventPackageByIdMutation = useMutation({
    mutationFn: (id: number) => getEventPackageById(id),
  });

  useEffect(() => {
    getEventPackagesMutation.mutate(queryObj);
  }, [queryObj, trigger]);

  const eventPackages = useMemo(() => {
    return getEventPackagesMutation.data;
  }, [getEventPackagesMutation.data]);

  return {
    eventPackages,
    trigger,
    switchTrigger,
    queryObj,
    setQueryObj,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    getEventPackagesMutation,
    getEventPackageByIdMutation,
    createEventPackageMutation,
  };
}
