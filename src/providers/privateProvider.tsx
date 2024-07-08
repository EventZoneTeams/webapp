"use client";

import { getMe, refreshToken, RefreshTokenSendData } from "@/api/auth";
import { getLocalToken, setLocalToken } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { User } from "@/types/authuser";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

export default function PrivateProvider({ children }: { children: ReactNode }) {
  return children;
}
