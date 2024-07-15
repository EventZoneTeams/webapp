import { useMutation } from "@tanstack/react-query";
import { getEventPackages, GetEventPackageSendData } from "@/api/event-package";
import { useEventPackageStore } from "@/stores/event-package";

export default function useEventPackage() {
  const { isCreateDialogOpen, setIsCreateDialogOpen, queryObj, setQueryObj } =
    useEventPackageStore();
  const getEventPackagesMutation = useMutation({
    mutationFn: (data: GetEventPackageSendData) => getEventPackages(data),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return {
    queryObj,
    setQueryObj,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    getEventPackagesMutation,
  };
}
