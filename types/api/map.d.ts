export interface NominationResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: [string, string, string, string];
}

interface Address {
  road: string;
  town: string;
  county: string;
  state: string;
  "ISO3166-2-lvl4": string;
  country: string;
  country_code: string;
}

export interface MyAddress {
  displayName: string;
  lat: string;
  lon: string;
  note?: string;
}
