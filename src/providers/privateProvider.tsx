"use client";

import { getMe } from "@/api/auth";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

export default function PrivateProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { jwt } = useAuthStore();
  const { authUser } = useUserStore();
  const getMeMutation = useMutation({
    mutationFn: () => getMe(),
    onSuccess: (data) => {
      useUserStore.setState({ authUser: data.data });
    },
  });

  useEffect(() => {
    if (!jwt) {
      router.push("/login");
      toast.error("You need to login to access this page");
    } else if (jwt && !authUser) {
      getMeMutation.mutate();
    }
  }, []);

  return <div>{children}</div>;
}
