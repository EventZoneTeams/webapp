import { Prediction } from "@/types/map";

export type GetAutoCompleteRequest = {
  input: string;
  location?: string;
  limit?: number;
  radius?: number;
  sessiontoken?: string;
  more_compound?: boolean;
};

export interface GoongApiResponse {
  predictions: Prediction[];
  execution_time: string;
  status: string;
}

export type PlaceApiResponse = {
  result: PlaceDetail;
  status: string;
};

export type PlaceDetail = {
  place_id: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  compound: {
    district: string;
    commune: string;
    province: string;
  };
  name: string;
  url: string;
  types: string[];
};
