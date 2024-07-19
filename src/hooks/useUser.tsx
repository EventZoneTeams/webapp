import {
  createManager,
  CreateManagerSendData,
  deleteUser,
  getuser,
  getUserById,
  GetUserSendData,
} from "@/api/user";
import { useUserStore } from "@/stores/user";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export default function useUser() {
  const { queryObj, setQueryObj, trigger, switchTrigger } = useUserStore();

  const getUserMutation = useMutation({
    mutationFn: (data: GetUserSendData) => getuser(data),
  });

  const getUserByIdMutation = useMutation({
    mutationFn: (userId: number) => getUserById(userId),
  });

  const createManagerMutation = useMutation({
    mutationFn: (data: CreateManagerSendData) => createManager(data),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
  });

  useEffect(() => {
    getUserMutation.mutate(queryObj);
  }, [queryObj, trigger]);

  const users = useMemo(() => {
    return getUserMutation.data;
  }, [getUserMutation.data]);
  return {
    users,
    queryObj,
    setQueryObj,
    trigger,
    switchTrigger,
    getUserMutation,
    getUserByIdMutation,
    createManagerMutation,
    deleteUserMutation,
  };
}
