"use client";

import Profile from "@/app/(root)/account/components/Profile";
import Tabs from "@/app/(root)/account/components/Tabs";
import Header from "@/components/shared/Header";
import { useAuthStore } from "@/stores/authStore";
import React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <React.Fragment>
      <Header />
      <div className="container mt-20 grid grid-cols-6 gap-4 p-0">
        <div className="col-span-2 rounded-lg p-4">
          <Profile user={user!} />
        </div>
        <div className="col-span-4 rounded-lg p-4 backdrop-blur-3xl">
          <Tabs />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
}
