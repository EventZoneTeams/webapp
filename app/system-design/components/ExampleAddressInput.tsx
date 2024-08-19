"use client";

import { MyAddress } from "@/types/api/map";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const AddressInput = dynamic(() => import("@/components/input/AddressInput"), {
  ssr: false,
});

const defaultPosition: MyAddress = {
  displayName:
    "ktx khu b, Phường Đông Hòa, Dĩ An, Thành phố Dĩ An, Tỉnh Bình Dương, Việt Nam",
  lat: "10.882755750000001",
  lon: "106.78301470105725",
};

export default function ExampleAddressInput() {
  const [address, setAddress] = useState<MyAddress | null>(null);

  useEffect(() => {
    if (address) {
      console.log(address);
    }
  }, [address]);
  return (
    <AddressInput onChange={setAddress} defaultAddress={defaultPosition} />
  );
}
