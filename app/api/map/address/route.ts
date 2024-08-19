import { ApiResponse } from "@/types/api";
import { NominationResponse } from "@/types/api/map";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json<ApiResponse<null>>(
      {
        message: "Missing lat and lon query parameters",
        isSuccess: false,
        data: null,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Nominatim");
    }

    const data: NominationResponse = await response.json();

    return NextResponse.json<ApiResponse<NominationResponse>>({
      isSuccess: true,
      message: null,
      data,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        isSuccess: false,
        message: (error as Error).message,
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
