"use client";

import useEventOrder from "@/hooks/useEventOrder";
import { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";

export default function page({ params }: { params: { id: string } }) {
  const { getEventOrderMutation } = useEventOrder();

  useEffect(() => {
    getEventOrderMutation.mutate(Number(params.id));
  }, [params.id]);

  const eventOrder = useMemo(
    () => getEventOrderMutation.data,
    [getEventOrderMutation.data]
  );

  return (
    <main>
      <Navbar />
      <div></div>
    </main>
  );
}
