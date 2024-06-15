"use client";

import FullpageLoader from "@/components/Loading/fullpage-loader";
import PrivateProvider from "@/providers/privateProvider";
import { useUserStore } from "@/stores/user";
import React from "react";

export default function layout({
  organizer,
  admin,
  manager,
}: {
  organizer: React.ReactNode;
  admin: React.ReactNode;
  manager: React.ReactNode;
}) {
  const { authUser } = useUserStore();

  return (
    <PrivateProvider>
      {authUser ? (
        <React.Fragment>
          {authUser.RoleName.toUpperCase() === "ADMIN" && admin}
          {authUser.RoleName.toUpperCase() === "STUDENT" && organizer}
          {authUser.RoleName.toUpperCase() === "MANAGER" && manager}
        </React.Fragment>
      ) : (
        <FullpageLoader />
      )}
    </PrivateProvider>
  );
}
