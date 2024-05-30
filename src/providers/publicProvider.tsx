"use client";

import { getMe } from "@/api/auth";
import { useUserStore } from "@/stores/user";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function PublicProvider({ children }: { children: ReactNode }) {
  const jwt = typeof window !== "undefined" && localStorage.getItem("jwt");
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
