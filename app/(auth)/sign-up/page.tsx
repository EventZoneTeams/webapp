import SignUpForm from "@/app/(auth)/sign-up/components/SignUpForm";
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
import { HomeIcon, KeyRoundIcon } from "lucide-react";
import { Link } from "next-view-transitions";

const SignUp = () => {
  return (
    <Card
      className={cn(
        "w-[500px] rounded-lg border-none bg-card/20 backdrop-blur-3xl",
      )}
    >
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to EventZone</CardTitle>
        <CardDescription className="text-base text-gray-300">
          Fill all the details to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-2">
        <div className="mb-4 flex w-full items-center justify-between">
          <Link href="/" className={cn("text-base font-normal")}>
            <Button variant={"link"} className="flex items-center gap-2">
              <HomeIcon size={20} />
              Home
            </Button>
          </Link>
          <Link href="/sign-in" className={cn("text-base font-normal")}>
            <Button variant={"link"} className="flex items-center gap-2">
              <KeyRoundIcon size={20} />
              Sign in
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
