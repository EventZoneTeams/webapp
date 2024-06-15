"use client";

import { getMe } from "@/api/auth";
import { getLocalToken } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { User } from "@/types/authuser";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function PublicProvider({ children }: { children: ReactNode }) {
  const pathName = usePathname();
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

  useEffect(() => {
    if (jwt && !authUser) {
      getMeMutation.mutate();
    }
  }, [jwt, pathName]);

  return <div>{children}</div>;
}
