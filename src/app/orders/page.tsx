"use client";

import useEventOrder from "@/hooks/useEventOrder";
import { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";

export default function page() {
  const { getMyOrderMutation } = useEventOrder();

  useEffect(() => {
    getMyOrderMutation.mutate();
  }, []);

  const eventOrder = useMemo(
    () => getMyOrderMutation.data,
    [getMyOrderMutation.data]
  );

  return (
    <main>
      <Navbar />
      <div>{eventOrder?.data?.map((order) => order.id)}</div>
    </main>
  );
}
