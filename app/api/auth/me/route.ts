import { BASE_URL } from "@/lib/api";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  if (!accessToken || !refreshToken) {
    redirect("/login");
  }

  const getMeResponse = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
