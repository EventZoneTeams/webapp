import SignInForm from "@/app/(auth)/sign-in/components/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const SignIn = () => {
  return (
    <Card className="w-1/2 shadow-lg">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-gray-500">
          Dont have an account?{" "}
          <a href="#" className="text-primary">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
