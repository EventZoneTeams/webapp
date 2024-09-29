import { Map } from "@/lib/api/map";
import React from "react";

export default async function EventLocation({ placeId }: { placeId: string }) {
  const place = (await Map.getPlaceById(placeId)).data;
  console.log(placeId);
  console.log(place);
  return <div>EventLocation</div>;
}
