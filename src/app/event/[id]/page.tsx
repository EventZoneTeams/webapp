"use client";

import useEvent from "@/hooks/useEvent";
import useFeedback from "@/hooks/useFeedback";
import { useEffect, useMemo } from "react";
import Ticket from "./components/Ticket";
import FullpageLoader from "@/components/Loading/fullpage-loader";

export default function page({ params }: { params: { id: string } }) {
  const { getEventByIdMutation } = useEvent();
  const { trigger } = useFeedback();

  useEffect(() => {
    getEventByIdMutation.mutate(Number(params.id));
  }, [params.id, trigger]);

  const event = useMemo(
    () => getEventByIdMutation.data,
    [getEventByIdMutation.data]
  );

  return event ? (
    <div className="container">
      <Ticket event={event} />
    </div>
  ) : (
    <FullpageLoader />
  );
}
