"use client";

import useEvent from "@/hooks/useEvent";
import { useEffect } from "react";

export default function page({ params }: { params: { id: string } }) {
  const { getEventByIdMutation } = useEvent();
  useEffect(() => {
    getEventByIdMutation.mutate(Number(params.id));
  }, [params.id]);

  const event = getEventByIdMutation.data;
  return <div>{event?.Name}</div>;
}
