"use client";

import useEvent from "@/hooks/useEvent";
import useFeedback from "@/hooks/useFeedback";
import { useEffect, useMemo } from "react";
import FullpageLoader from "@/components/Loading/fullpage-loader";
import Navbar from "@/components/Navbar";
import Package from "./components/Package";
import Ticket from "./components/Ticket";
import Description from "./components/Description";

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

  return (
    <main>
      <Navbar />
      {event ? (
        <div className="container">
          <section>
            <Ticket event={event} />
          </section>
          <section className="mt-12 flex w-full">
            <section className="w-full bg-muted">
              <Description description={event.Description} />
            </section>
            <section className="ml-4 ">
              {/* <Package eventPackages={event.EventPackage} /> */}
            </section>
          </section>
        </div>
      ) : (
        <FullpageLoader />
      )}
    </main>
  );
}
