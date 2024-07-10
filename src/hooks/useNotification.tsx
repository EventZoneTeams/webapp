import { getAllNotifications } from "@/api/notification";
import { useNotificationStore } from "@/stores/notification";
  import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuth from "./useAuth";

  export default function useNotification() {
    const { authUser } = useAuth();
    const {
        notifications,
        setNotifications,
    } = useNotificationStore();
  
    const getNotificationMutation = useMutation({
      mutationFn: (userId:number) => getAllNotifications(userId),
      onSuccess: (data) => {
        setNotifications(data);
      },
    });

    useEffect(() => {
        if (authUser) {
            getNotificationMutation.mutate(authUser.Id)
        }
      }, [authUser]);

      const refetch = () => {
        if (authUser) {
            getNotificationMutation.mutate(authUser.Id)
        }
      }
    
    
    return {
        notifications,
        refetch,
        setNotifications,
        getNotificationMutation,
    };
  }
  