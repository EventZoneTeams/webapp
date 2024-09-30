export interface Prediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  has_children: boolean;
  plus_code: PlusCode;
  compound: Compound;
  terms: Term[];
  types: string[];
  distance_meters: number | null;
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
  secondary_text_matched_substrings: MatchedSubstring[];
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Compound {
  district: string;
  commune: string;
  province: string;
}

export interface Term {
  offset: number;
  value: string;
}

export type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Marker = {
  latitude: number;
  longitude: number;
};
