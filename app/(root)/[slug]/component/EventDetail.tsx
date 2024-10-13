import EventHeader from "./EventHeader";
import EventTabs from "./EventTabs";
import { EventProduct as EventProductAPI } from "@/lib/api/event-product";
import { Event as EventAPI } from "@/lib/api/event"; // Import event API
import DisplayContent from "@/components/minimal-tiptap/display-content";
export default async function EventDetail({
  params,
}: {
  params: { slug: string };
}) {
  const eventResponse = await EventAPI.getById(params.slug);
  const event = eventResponse?.data;

  if (!event) {
    return <div>Event not found</div>;
  }

  const productsResponse = await EventProductAPI.getProductsByEventId(event.id);
  const products = productsResponse.isSuccess ? productsResponse.data : [];

  return (
    <div className="space-y-6">
      <EventHeader event={event} />
      <EventTabs event={event} products={products} />
    </div>
  );
}
