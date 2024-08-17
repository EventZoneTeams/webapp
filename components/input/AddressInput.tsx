"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Map } from "@/lib/map";
import { MyAddress } from "@/types/map";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

const icon = new L.Icon({
  iconUrl: "/assets/icons/location.svg",
  iconSize: [60, 50],
});

const mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function DraggableMarker({
  defaultPosition,
  setPosition,
}: {
  defaultPosition: L.LatLng;
  setPosition: (position: L.LatLng) => void;
  onchange?: (position: L.LatLng) => void;
}) {
  const markerRef = useRef<L.Marker | null>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current as L.Marker | null;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
        }
      },
    }),
    [setPosition],
  );

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const newPosition = new L.LatLng(lat, lng);
      setPosition(newPosition);
    },
  });

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={defaultPosition}
      ref={markerRef}
      icon={icon}
    />
  );
}

interface MapProps {
  onChange: (address: MyAddress) => void;
  defaultAddress?: MyAddress;
}

export default function AddressInput({ onChange, defaultAddress }: MapProps) {
  const [currentLocation, setCurrentLocation] = useState<L.LatLng | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<MyAddress>();

  useEffect(() => {
    if (currentLocation) {
      Map.getLocationFromLatLng(currentLocation).then((data) => {
        if (data.isSuccess && data.data) {
          setAddress({
            displayName: data.data.display_name,
            lat: data.data.lat,
            lon: data.data.lon,
          });
        }
      });
    }
  }, [currentLocation, onChange]);

  useEffect(() => {
    if (address) {
      onChange(address);
    }
  }, [address, onChange]);

  useEffect(() => {
    if (defaultAddress) {
      const newLocation: L.LatLng = new L.LatLng(
        parseFloat(defaultAddress.lat),
        parseFloat(defaultAddress.lon),
      );
      setCurrentLocation(newLocation);
      setAddress(defaultAddress);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation: L.LatLng = new L.LatLng(latitude, longitude);
          setCurrentLocation(newLocation);
        },
        (error) => {
          setLocationError("Error getting user location: Permission denied.");
          console.error("Error getting user location:", error);
        },
      );
    }
  }, [defaultAddress]);

  const handleResetLocation = useCallback(() => {
    setIsLoading(true);
    if (defaultAddress) {
      const newLocation: L.LatLng = new L.LatLng(
        parseFloat(defaultAddress.lat),
        parseFloat(defaultAddress.lon),
      );
      setCurrentLocation(newLocation);
      if (mapRef.current) {
        mapRef.current.flyTo(newLocation, mapRef.current.getZoom());
      }
      setIsLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation: L.LatLng = new L.LatLng(latitude, longitude);
          setCurrentLocation(newLocation);
          if (mapRef.current) {
            mapRef.current.flyTo(newLocation, mapRef.current.getZoom());
          }
          setIsLoading(false);
        },
        (error) => {
          setLocationError("Error getting user location: Permission denied.");
          console.error("Error getting user location:", error);
        },
      );
    }
  }, [defaultAddress]);

  if (locationError) {
    alert(locationError);
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-red-300 text-white">
        {locationError}
      </div>
    );
  }

  return currentLocation ? (
    <div className="z-0 w-full space-y-2">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Pick yout location on map..."
          value={address?.displayName}
          className="line-clamp-1 flex-1"
        />
        <Button
          className=" "
          onClick={handleResetLocation}
          variant={"outline"}
          disabled={isLoading}
        >
          Reset Location
        </Button>
      </div>
      <Textarea
        placeholder="Note"
        rows={3}
        className="resize-none"
        onChange={(e) => {
          if (address) {
            //debounce here for 500ms
          }
        }}
      />
      <MapContainer
        center={currentLocation}
        zoom={13}
        className="relative aspect-video w-full rounded"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={mapUrl}
          className="rounded"
        />
        <DraggableMarker
          defaultPosition={currentLocation}
          setPosition={setCurrentLocation}
          onchange={(position) => {
            setCurrentLocation(position);
          }}
        />
      </MapContainer>
    </div>
  ) : (
    <div className="aspect-video w-full animate-pulse bg-gray-300 text-gray-300">
      Loading...
    </div>
  );
}
