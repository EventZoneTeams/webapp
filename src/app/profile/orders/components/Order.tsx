"use client";

import useEventOrder from "@/hooks/useEventOrder";
import { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";

export default function PackageOrder() {
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
      <div>
        {eventOrder?.data?.map((order) => (
          <div key={order.id}>{order.id}</div>
        ))}
      </div>
    </main>
  );
}
