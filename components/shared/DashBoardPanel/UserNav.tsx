"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { User as UserApi } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Wallet as WalletService } from "@/lib/api/wallet";
import { Wallet as WalletType } from "@/types/wallet";
import { Badge } from "@/components/ui/badge";
import { VnDong } from "@/lib/format";
import { useTriggerStore } from "@/stores/triggerStore";

export function UserNav() {
  const { user } = useAuthStore();
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const router = useRouter();
  const { trigger } = useTriggerStore();

  const handleGetWallet = useCallback(async () => {
    const rs = (await WalletService.getUserWallets()).data;
    if (rs && rs.length > 0) {
      setWallet(rs[0]);
    }
  }, []);

  useEffect(() => {
    if (user) {
      handleGetWallet();
    }
  }, [user, trigger]);

  const handleSignOut = () => {
    UserApi.signOut();
    router.push("/sign-in");
  };
  return (
    <>
      <DropdownMenu>
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-4">
                  <div className="font-semibold text-nav-text-secondary">
                    {VnDong.format(wallet?.balance || 0)}
                  </div>
                  <Button
                    variant="outline"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.imageUrl} alt="Avatar" />
                      <AvatarFallback className="bg-transparent">
                        {user && user.fullName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </div>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">Account</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.fullName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link href="/account/wallet" className="flex items-center">
                <User className="mr-3 h-4 w-4 text-muted-foreground" />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link href="/dashboard" className="flex items-center">
                <LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
                Dashboard
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
