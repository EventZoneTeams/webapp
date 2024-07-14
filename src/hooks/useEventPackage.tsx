import {useMutation} from "@tanstack/react-query";
import {getEventPackages, GetEventPackageSendData} from "@/api/event-package";

export default function useEventPackage() {
    const getEventPackagesMutation = useMutation({
        mutationFn: (data: GetEventPackageSendData) => getEventPackages(data),
        onSuccess: (data) => {
            console.log(data);
        }
    });
    return {
        getEventPackagesMutation
    }
}