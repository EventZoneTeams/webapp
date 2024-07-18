import { useMutation } from "@tanstack/react-query";
import {
  createEventPackage,
  CreateEventPackageSendData,
  getEventPackages,
  GetEventPackageSendData,
} from "@/api/event-package";
import { useEventPackageStore } from "@/stores/event-package";
import { toast } from "sonner";

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
  return {
    trigger,
    switchTrigger,
    queryObj,
    setQueryObj,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    getEventPackagesMutation,
    createEventPackageMutation,
  };
}
