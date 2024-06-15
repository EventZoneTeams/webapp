"use client";

import { getMe } from "@/api/auth";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function PublicProvider({ children }: { children: ReactNode }) {
  const { jwt, setJwt, setJwtRefreshToken } = useAuthStore();
  const pathName = usePathname();
  const { authUser } = useUserStore();
  const getMeMutation = useMutation({
    mutationFn: () => getMe(),
    onSuccess: (data) => {
      useUserStore.setState({ authUser: data.data });
    },
  });

  useEffect(() => {
    if (jwt && !authUser) {
      getMeMutation.mutate();
    }
  }, [jwt, pathName]);

  return <div>{children}</div>;
}
