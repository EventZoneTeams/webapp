import { ApiResponse } from "@/types/api";
import { GetAutoCompleteRequest, GoongApiResponse } from "@/types/api/map";
import { Prediction } from "@/types/map";
import axios from "axios";

const GOONG_API_KEY = process.env.NEXT_PUBLIC_GOONG_API_KEY;
const GOONG_BASE_URL = "https://rsapi.goong.io";

export namespace Map {
  export const getAutoComplete = async (
    request: GetAutoCompleteRequest,
  ): Promise<ApiResponse<Prediction[]>> => {
    try {
      const queryString = new URLSearchParams();
      queryString.append("input", request.input);
      if (request.location) {
        queryString.append("location", request.location);
      }
      if (request.limit) {
        queryString.append("limit", request.limit.toString());
      }
      if (request.radius) {
        queryString.append("radius", request.radius.toString());
      }
      if (request.sessiontoken) {
        queryString.append("sessiontoken", request.sessiontoken);
      }
      if (request.more_compound) {
        queryString.append("more_compound", request.more_compound.toString());
      }

      if (GOONG_API_KEY) {
        const response = (
          await axios.get<GoongApiResponse>(
            `${GOONG_BASE_URL}/Place/AutoComplete?api_key=${GOONG_API_KEY}`,
            {
              params: queryString,
            },
          )
        ).data;

        return {
          isSuccess: true,
          message: "Success",
          data: response.predictions,
        };
      } else {
        throw new Error("Goong API key is not provided");
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message,
        data: [],
      };
    }
  };

  export const getPlaceById = async (placeId: string) => {};
}
