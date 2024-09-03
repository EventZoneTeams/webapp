"use client";

import DashBoardLayout from "@/components/shared/DashBoardPanel/DashboardLayout";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useAuthStore } from "@/stores/authStore";
import React from "react";

export default function layout({
  admin,
  organizer,
  manager,
}: {
  admin: React.ReactNode;
  organizer: React.ReactNode;
  manager: React.ReactNode;
}) {
  const { user } = useAuthStore();

  if (!user) {
    return <LoadingScreen message="Loading User..." />;
  }

  switch (user?.role.roleName.toUpperCase()) {
    case "ADMIN":
      return <DashBoardLayout type="admin">{admin}</DashBoardLayout>;
    case "ORGANIZER":
      return <DashBoardLayout type="organizer">{organizer}</DashBoardLayout>;
    case "MANAGER":
      return <DashBoardLayout type="manager">{manager}</DashBoardLayout>;
  }
}
