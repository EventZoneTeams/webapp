"use client";

import React, { useEffect } from "react";
import useEventPackage from "@/hooks/useEventPackage";

export default function page({ params }: { params: { id: string } }) {
  const { getEventPackagesMutation } = useEventPackage();

  useEffect(() => {
    getEventPackagesMutation.mutate({ EventId: 3 });
  }, []);

  return <div>hi</div>;
}
