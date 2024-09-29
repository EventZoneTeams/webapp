"use client";

import * as React from "react";
import { useState } from "react";
import ReactMapGL from "@goongmaps/goong-map-react";
import { Viewport } from "@/types/map";

const GOONG_API_KEY = process.env.NEXT_PUBLIC_GOONG_API_KEY;

export default function Map() {
  const [viewport, setViewport] = useState<Viewport>({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      className=""
      onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
      mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
      goongApiAccessToken={GOONG_API_KEY}
    />
  );
}
