"use client";

import useAuth from "@/hooks/useAuth";
import { getLocalToken } from "@/stores/auth";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function PublicProvider({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const jwt = getLocalToken().jwt;
  const { getMeMutation, authUser } = useAuth();

  useEffect(() => {
    if (jwt && !authUser) {
      getMeMutation.mutate();
    }
  }, [jwt, pathName]);

  return <div>{children}</div>;
}
