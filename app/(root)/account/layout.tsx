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
      <div className="container mt-4 p-4 sm:mt-8 md:mt-12 md:p-0 lg:mt-20">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full rounded-lg p-4 md:w-1/3 lg:w-1/4">
            <Profile user={user!} />
          </div>
          <div className="w-full rounded-lg p-4 backdrop-blur-3xl md:w-2/3 lg:w-3/4">
            <Tabs />
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
