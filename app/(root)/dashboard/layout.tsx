"use client";

import DashBoardLayout from "@/components/shared/DashBoardPanel/DashboardLayout";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Layout({
  admin,
  organizer,
  manager,
}: {
  admin: React.ReactNode;
  organizer: React.ReactNode;
  manager: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const router = useRouter();

  if (!user) {
    // return <LoadingScreen message="Loading User..." />;
    return <DashBoardLayout type="admin">{admin}</DashBoardLayout>;
  }

  switch (user?.role.roleName.toUpperCase()) {
    case "ADMIN":
      return <DashBoardLayout type="admin">{admin}</DashBoardLayout>;
    case "STUDENT":
      return <DashBoardLayout type="organizer">{organizer}</DashBoardLayout>;
    case "MANAGER":
      return <DashBoardLayout type="manager">{manager}</DashBoardLayout>;
    default:
      toast.info("You are not authorized to view this page");
      router.push("/sign-in");
      return <LoadingScreen message="Loading User..." />;
  }
}
