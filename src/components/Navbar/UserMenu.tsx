"use client";

import {
  CircleUser,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user";

export function UserMenu() {
  const { theme, setTheme } = useTheme();
  const { authUser } = useUserStore();

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwtRefreshToken");
    useUserStore.setState({ authUser: null });
  };

  return (
    <div className="">
      {authUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="rounded-lg flex items-center gap-2  px-3 py-2 pr-4 bg-muted hover:cursor-pointer hover:bg-muted/80">
              <Avatar className="size-10">
                <AvatarImage src={authUser.image} alt={authUser["full-name"]} />
                <AvatarFallback className="bg-tertiary text-white ">
                  {authUser?.["full-name"]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold max-w-40 truncate">
                  {authUser["full-name"]}
                </span>
                <span className="text-xs max-w-40 truncate">
                  {authUser.email}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 mr-6">
            <DropdownMenuLabel className="text-orange-500">
              <Badge
                className={cn({
                  "bg-orange-500 text-orange-50 hover:bg-orange-600 hover:text-orange-100":
                    authUser["role-name"] === "ADMIN",
                })}
              >
                {authUser["role-name"]}
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
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
