"use client";

import * as React from "react";
import { useState } from "react";
import MapGL, { Marker } from "@goongmaps/goong-map-react";
import { Viewport } from "@/types/map";
import Image from "next/image";
import MARKER_ICON from "@/public/assets/icons/map_marker_icon.png";

const GOONG_API_MAP_KEY = process.env.NEXT_PUBLIC_GOONG_API_MAP_KEY;
const MAP_STYLE = "https://tiles.goong.io/assets/goong_map_web.json";

interface Props {
  defaultViewport: Viewport;
  eventImage: string;
}

export default function Map(props: Props) {
  const [viewport, setViewport] = useState<Viewport>(
    props.defaultViewport ?? {
      latitude: 21.028,
      longitude: 105.83991,
      zoom: 15,
    },
  );

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      className="size-full rounded-xl"
      onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
      mapStyle={MAP_STYLE}
      goongApiAccessToken={GOONG_API_MAP_KEY}
    >
      <Marker
        latitude={props.defaultViewport?.latitude!}
        longitude={props.defaultViewport?.longitude!}
        offsetLeft={0}
        offsetTop={0}
        draggable={false}
      >
        {props.eventImage ? (
          <Image
            src={props.eventImage}
            alt="event"
            width={40}
            height={40}
            className="user-select-none rounded-full ring-2 ring-red-500"
          />
        ) : (
          <Image
            src={MARKER_ICON}
            alt="marker"
            width={40}
            height={40}
            className=""
          />
        )}
      </Marker>
    </MapGL>
  );
}
