import {
  createManager,
  CreateManagerSendData,
  deleteUser,
  getuser,
  getUserById,
  GetUserSendData,
} from "@/api/user";
import { useMutation } from "@tanstack/react-query";

export default function useUser() {
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

  return {
    getUserMutation,
    getUserByIdMutation,
    createManagerMutation,
    deleteUserMutation,
  };
}
