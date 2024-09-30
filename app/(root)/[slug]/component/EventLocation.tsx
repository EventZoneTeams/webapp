"use client";
import { useEffect, useState } from "react";
import MapGL, { Marker } from "@goongmaps/goong-map-react";
import { Viewport } from "@/types/map";
import Image from "next/image";
import MARKER_ICON from "@/public/assets/icons/map_marker_icon.png";
import { Map as MapService } from "@/lib/api/map";

const GOONG_API_MAP_KEY = process.env.NEXT_PUBLIC_GOONG_API_MAP_KEY;
const MAP_STYLE = "https://tiles.goong.io/assets/goong_map_web.json";

interface Props {
  eventImage: string;
  placeId: string;
}

export default function Map(props: Props) {
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 21.028,
    longitude: 105.83991,
    zoom: 15,
  });

  useEffect(() => {
    if (props.placeId) {
      MapService.getPlaceById(props.placeId).then((response) => {
        if (response.isSuccess) {
          setViewport({
            latitude: response.data?.geometry.location.lat!,
            longitude: response.data?.geometry.location.lng!,
            zoom: 15,
          });
        }
      });
    }
  }, []);

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      className="size-full rounded-xl"
      onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
      mapStyle={MAP_STYLE}
      goongApiAccessToken={GOONG_API_MAP_KEY}
      scrollZoom={{
        speed: 0.01,
        smooth: true,
      }}
      doubleClickZoom={true}
    >
      <Marker
        latitude={viewport.latitude}
        longitude={viewport.longitude}
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
