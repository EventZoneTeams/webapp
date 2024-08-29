"use client";

import { useEffect } from "react";
import { getAccessToken } from "@/lib/api/token";
import { User } from "@/lib/api/user";
import { useAuthStore } from "@/stores/authStore";

export default function RefreshUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      clearAuth();
    } else {
      User.getMe().then((data) => {
        if (data.isSuccess && data.data) {
          setUser(data.data);
        } else {
          clearAuth();
        }
      });
    }
  }, [setUser, clearAuth]);

  return <>{children}</>;
}
