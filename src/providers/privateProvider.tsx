"use client";

import { getMe, refreshToken, RefreshTokenSendData } from "@/api/auth";
import { getLocalToken, setLocalToken } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { User } from "@/types/authuser";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

export default function PrivateProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { authUser, setAuthUser } = useUserStore();
  const jwt = getLocalToken().jwt;

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
  });

  const refreshTokenMutation = useMutation({
    mutationFn: (data: RefreshTokenSendData) => refreshToken(data),
    onSuccess: (data) => {
      setLocalToken(data.jwt, data["jwt-refresh-token"]);
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
