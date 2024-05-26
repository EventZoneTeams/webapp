"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname().split("/")[1];

  const router = useRouter();

  return (
    <div className="w-full grid justify-items-center">
      <Tabs defaultValue={pathname} className="w-[500px] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="login"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            onClick={() => {
              router.push("/register");
            }}
          >
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">{children}</TabsContent>
        <TabsContent value="register">{children}</TabsContent>
      </Tabs>
    </div>
  );
}
