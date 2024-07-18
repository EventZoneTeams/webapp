"use client";

import useEvent from "@/hooks/useEvent";
import { useEffect, useMemo } from "react";
import FullpageLoader from "@/components/Loading/fullpage-loader";
import Navbar from "@/components/Navbar";
import Package from "./components/Package";
import Ticket from "./components/Ticket";
import Description from "./components/Description";
import Campaign from "./components/Campaign";
import useEventCampaign from "@/hooks/useEventCampaign";

export default function page({ params }: { params: { id: string } }) {
  const { getEventByIdMutation } = useEvent();

  useEffect(() => {
    getEventByIdMutation.mutate(Number(params.id));
  }, [params.id]);

  const event = useMemo(
    () => getEventByIdMutation.data,
    [getEventByIdMutation.data]
  );

  const { getEventCampaignByEventIdMutation } = useEventCampaign();

  useEffect(() => {
    if (event?.Id) {
      getEventCampaignByEventIdMutation.mutate(event.Id);
    }
  }, [event?.Id]);

  const eventCampaigns = useMemo(
    () => getEventCampaignByEventIdMutation.data,
    [getEventCampaignByEventIdMutation.data]
  );

  return (
    <main>
      <Navbar />
      {event ? (
        <div className="container mb-4">
          <section>
            <Ticket event={event} />
          </section>

          <section className="mt-12 flex w-full">
            <section className="w-full bg-muted rounded-lg">
              <Description description={event.Description} />
            </section>
            <div>
              {eventCampaigns && eventCampaigns.length > 0
                ? eventCampaigns.map((eventCampaign) => (
                    <section className="ml-4 mb-4 bg-muted rounded-lg">
                      <Campaign campaignId={eventCampaign.id} />
                    </section>
                  ))
                : null}

              {event.EventPackage && event.EventPackage.length > 0 ? (
                <section className="ml-4 bg-muted rounded-lg">
                  <Package eventPackages={event.EventPackage} />
                </section>
              ) : null}
            </div>
          </section>
        </div>
      ) : (
        <FullpageLoader />
      )}
    </main>
  );
}
