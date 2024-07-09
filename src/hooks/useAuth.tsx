import {
  getMe,
  login,
  LoginResponse,
  refreshToken,
  RefreshTokenSendData,
  register,
  RegisterResponse,
} from "@/api/auth";
import { LoginFormType } from "@/schemas/loginFormSchema";
import { registerFormType } from "@/schemas/registerFromSchema";
import { getLocalToken, setLocalToken } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { User } from "@/types/authuser";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useAuth() {
  const { setAuthUser, reset, authUser } = useUserStore();
  const { jwt, jwtRefreshToken } = getLocalToken();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormType) => login(data),
    onSuccess: (data: LoginResponse) => {
      setLocalToken(data.jwt, data["jwt-refresh-token"]);
      toast.success("Login successful");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: registerFormType) => register(data),
    onSuccess: (data: RegisterResponse) => {
      console.log(data);
      toast.success("Register successfully, please login to continue");
      router.push("/login");
    },
    onError: (error: AxiosError<RegisterResponse>) => {
      toast.error(error.response?.data.message);
    },
  });

  const getMeMutation = useMutation({
    mutationFn: () => getMe(),
    onSuccess: (data) => {
      if (data.data) {
        const responseUser = data.data;
        const user: User = {
          Id: responseUser.id,
          Email: responseUser.email,
          UnsignFullName: responseUser["unsign-full-name"],
          FullName: responseUser["full-name"],
          Dob: responseUser.dob,
          Gender: responseUser.gender,
          Image: responseUser.image,
          University: responseUser.university,
          IsDeleted: responseUser["is-deleted"],
          RoleName: responseUser["role-name"],
        };
        setAuthUser(user);
      }
    },
    onError: (error) => {
      if (jwtRefreshToken) {
        refreshTokenMutation.mutate({
          "access-token": jwt as string,
          "refresh-token": jwtRefreshToken as string,
        });
      }
    },
  });

  const refreshTokenMutation = useMutation({
    mutationFn: (data: RefreshTokenSendData) => refreshToken(data),
    onSuccess: (data) => {
      setLocalToken(data.jwt, data["jwt-refresh-token"]);
      getMeMutation.mutate();
    },
    onError: (error) => {
      toast.error(error.message);
      router.push("/login");
    },
  });
  return {
    loginMutation,
    registerMutation,
    getMeMutation,
    refreshTokenMutation,
    setAuthUser,
    reset,
    authUser,
  };
}
