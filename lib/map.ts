import { NominationResponse } from "@/types/map";
import { ApiResponse } from "@/types/api";

export namespace Map {
  export const getLocationFromLatLng = async (coordinates: L.LatLng) => {
    const response = await fetch(
      `/api/map/address?lat=${coordinates.lat}&lon=${coordinates.lng}`,
    );
    const data: ApiResponse<NominationResponse> = await response.json();
    return data;
  };
}
