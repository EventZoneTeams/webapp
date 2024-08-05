import { NominationResponse } from "@/types/address";
import { NextRequest, NextResponse } from "next/server";

interface ApiResponse<T> {
  isSuccess: boolean;
  error: string | null;
  data: T | null;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json<ApiResponse<null>>(
      {
        error: "Missing lat and lon query parameters",
        isSuccess: false,
        data: null,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Nominatim");
    }

    const data: NominationResponse = await response.json();

    return NextResponse.json<ApiResponse<NominationResponse>>({
      isSuccess: true,
      error: null,
      data,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        isSuccess: false,
        error: (error as Error).message,
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
