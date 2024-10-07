import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventProduct as EventProductAPI } from "@/lib/api/event-product";
import { Event as EventAPI } from "@/lib/api/event"; // Import event API
import { format } from "date-fns";
import Image from "next/image";
import EventTabs from "./EventTabs"; // Import the EventTabs component
import DisplayContent from "@/components/minimal-tiptap/display-content";

export default async function EventDetail({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch event data
  const eventResponse = await EventAPI.getById(params.slug);
  const event = eventResponse?.data;

  // If the event is null, show an error or fallback UI
  if (!event) {
    return <div>Event not found</div>;
  }

  // Fetch products data for the event
  const productsResponse = await EventProductAPI.getProductsByEventId(event.id);
  const products = productsResponse.isSuccess ? productsResponse.data : [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{event?.name}</h1>
      <div className="my-6 flex w-full gap-6">
        <div className="space-y-4">
          <Image
            width={400}
            height={400}
            alt={event?.name!}
            src={event?.thumbnailUrl!}
            className="aspect-square size-[400px] rounded-xl object-cover"
          />

          <div className="space-y-2">
            <p>
              <span className="text-sm text-primary/50">Hosted by</span>
            </p>
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={event?.user.imageUrl!} />
                <AvatarFallback>
                  {event?.user.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-base font-semibold text-primary">
                {event?.user.fullName}
              </span>
            </div>
          </div>
        </div>

        {/* Pass the event and products data to the EventTabs component */}
        <EventTabs event={event} products={products} />
      </div>

      <div className="w-full space-y-6">
        <p className="border-b-[1px] border-primary/20 pb-2 text-sm font-semibold text-primary/50">
          About Event
        </p>
        {/* <div dangerouslySetInnerHTML={{ __html: event?.description! }}></div> */}
        <DisplayContent content={event?.description!} />
      </div>

      <div className="border-t-[1px] border-primary/20 py-2 text-sm text-primary/20">
        Created at {format(event.createdAt, "PPpp")}
      </div>
    </div>
  );
}
