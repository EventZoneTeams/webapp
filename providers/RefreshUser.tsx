"use client";

import { useEffect, useState } from "react";
import { getAccessToken, getRefreshToken } from "@/lib/api/token";
import { User } from "@/lib/api/user";
import { useAuthStore } from "@/stores/authStore";

export default function RefreshUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      console.log("no access token");
      clearAuth();
    } else {
      setIsLoading(true);
      User.getMe()
        .then((data) => {
          if (data.isSuccess && data.data) {
            setUser(data.data);
          } else {
            clearAuth();
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [setUser, clearAuth]);

  console.log(new Date().toISOString());

  return isLoading ? (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      loadding...
    </div>
  ) : (
    <>{children}</>
  );
}
