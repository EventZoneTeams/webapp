"use client";

import { useAuthStore } from "@/stores/auth";
import React from "react";

export default function layout({
  organizer,
  admin,
}: {
  organizer: React.ReactNode;
  admin: React.ReactNode;
}) {
  const { authUser } = useAuthStore();
  return <div>{authUser?.roleName !== "ADMIN" ? organizer : admin}</div>;
}
