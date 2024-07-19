"use client";

import { CreditCard, LifeBuoy, LogOut, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { removeLocalToken } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const { theme, setTheme } = useTheme();
  const { authUser } = useUserStore();
  const router = useRouter();

  const logout = () => {
    router.push("/");
    removeLocalToken();
    useUserStore.setState({ authUser: null });
    localStorage.removeItem("cart");
  };

  return (
    <div className="">
      {authUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="rounded-lg flex items-center gap-2 cursor-pointer">
              <Avatar className="size-10">
                <AvatarImage src={authUser.Image} alt={authUser.FullName} />
                <AvatarFallback className="bg-tertiary text-white ">
                  {authUser?.FullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold max-w-40 truncate">
                  {authUser.FullName}
                </span>
                <span className="text-xs max-w-40 truncate">
                  {authUser.Email}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 mt-1 shadow-2xl bg-secondary-background">
            <DropdownMenuLabel className="text-orange-500">
              <Badge
                className={cn({
                  "bg-orange-500 text-orange-50 hover:bg-orange-600 hover:text-orange-100":
                    authUser.RoleName === "ADMIN",
                })}
              >
                {authUser.RoleName}
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/profile/me`} className="hover:cursor-pointer">
                <DropdownMenuItem className="hover:cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              <div className="flex items-center w-full">
                <Label htmlFor="airplane-mode" className="flex-1">
                  Dark Mode
                </Label>
                <Switch
                  id="airplane-mode"
                  checked={theme === "dark" ? true : false}
                  className="bg-tertiary"
                />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
