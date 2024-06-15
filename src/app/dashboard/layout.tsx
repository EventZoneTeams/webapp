"use client";

import FullpageLoader from "@/components/Loading/fullpage-loader";
import PrivateProvider from "@/providers/privateProvider";
import { useUserStore } from "@/stores/user";
import React from "react";

export default function layout({
  organizer,
  admin,
}: {
  organizer: React.ReactNode;
  admin: React.ReactNode;
}) {
  const { authUser } = useUserStore();
  console.log();

  return (
    <PrivateProvider>
      {authUser ? (
        authUser.RoleName.toUpperCase() === "ADMIN" ? (
          admin
        ) : (
          organizer
        )
      ) : (
        <FullpageLoader />
      )}
    </PrivateProvider>
  );
}
