import SignInForm from "@/app/(auth)/sign-in/components/SignInForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import GoogleLogo from "@/public/assets/logos/google-logo.svg";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowLeftIcon, UserPlusIcon } from "lucide-react";

const SignIn = () => {
  return (
    <Card className={cn("w-[500px] border-none shadow-none")}>
      <CardHeader>
        <CardTitle className="text-center text-3xl">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex w-full items-center justify-center gap-2 text-center text-sm text-gray-500">
          <div className="h-[1px] flex-1 bg-gray-300"></div>
          or continute with
          <div className="h-[1px] flex-1 bg-gray-300"></div>
        </div>
        <div className="w-full">
          <Button
            variant={"outline"}
            className="flex w-full items-center gap-2"
          >
            <Image src={GoogleLogo} alt="Google Logo" width={20} height={20} />
            <span>Google</span>
          </Button>
        </div>

        <div className="mb-4 flex w-full items-center justify-between">
          <Link href="/system-design" className={cn("text-base font-normal")}>
            <Button
              variant={"outline"}
              className="flex items-center gap-2 backdrop-blur-sm"
            >
              <ArrowLeftIcon size={20} />
              Home
            </Button>
          </Link>
          <Link href="/sign-up" className={cn("text-base font-normal")}>
            <Button
              variant={"outline"}
              className="flex items-center gap-2 backdrop-blur-sm"
            >
              <UserPlusIcon size={20} />
              Sign Up
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
