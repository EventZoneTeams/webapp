"use client";

import { getMe, refreshToken, RefreshTokenSendData } from "@/api/auth";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

export default function PrivateProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { jwt, setJwt, setJwtRefreshToken } = useAuthStore();
  const { authUser } = useUserStore();

  const getMeMutation = useMutation({
    mutationFn: () => getMe(),
    onSuccess: (data) => {
      useUserStore.setState({ authUser: data.data });
    },
  });

  const refreshTokenMutation = useMutation({
    mutationFn: (data: RefreshTokenSendData) => refreshToken(data),
    onSuccess: (data) => {
      setJwt(data.jwt);
      setJwtRefreshToken(data["jwt-refresh-token"]);
    },
    onError: (error) => {
      toast.error(error.message);
      router.push("/login");
    },
  });

  useEffect(() => {
    if (!jwt) {
      router.push("/login");
      toast.error("You need to login to access this page");
    } else if (jwt && !authUser) {
      getMeMutation.mutate();
    }
  }, [jwt, authUser, pathname]);

  return <div>{children}</div>;
}
