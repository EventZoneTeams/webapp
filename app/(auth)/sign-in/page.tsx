import SignInForm from "@/app/(auth)/sign-in/components/SignInForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, HomeIcon, UserPlusIcon } from "lucide-react";
import { Link } from "next-view-transitions";

const SignIn = () => {
  return (
    <Card
      className={cn(
        "w-[500px] rounded-lg border-none bg-card/20 backdrop-blur-3xl",
      )}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Welcome to EventZone
        </CardTitle>
        <CardDescription className="text-base text-gray-300">
          Sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-2">
        {/* <Button
          variant={"secondary"}
          className="flex w-full items-center gap-2 border-none"
        >
          <Image src={GoogleLogo} alt="Google Logo" width={20} height={20} />
          <span>Google</span>
        </Button> */}

        <div className="mb-4 flex w-full items-center justify-between">
          <Link href="/system-design" className={cn("text-base font-normal")}>
            <Button
              variant={"link"}
              className="flex items-center gap-2 bg-transparent"
            >
              <HomeIcon size={20} />
              Home
            </Button>
          </Link>
          <Link href="/sign-up" className={cn("text-base font-normal")}>
            <Button variant={"link"} className="flex items-center gap-2">
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
