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
