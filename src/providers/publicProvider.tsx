"use client";

import { getMe } from "@/api/auth";
import FullpageLoader from "@/components/Loading/fullpage-loader";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";

export default function PublicProvider({ children }: { children: ReactNode }) {
  const { jwt } = useAuthStore();
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
  }, [jwt]);

  return <div>{children}</div>;
}
