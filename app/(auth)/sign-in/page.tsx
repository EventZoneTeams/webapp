import SignInForm from "@/app/(auth)/sign-in/components/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

const SignIn = () => {
  return (
    <Card className={cn("bg-white/80 backdrop-blur-md")}>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default SignIn;
