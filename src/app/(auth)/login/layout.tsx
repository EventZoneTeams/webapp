import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>{children}</div>
          <Button variant="outline" className="w-full">
            Continuted with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
