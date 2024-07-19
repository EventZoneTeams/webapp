import { EventPackage } from "@/types/event-packages.";
import { ShoppingCart } from "lucide-react";

export default function PackageCard({
  eventPackage,
}: {
  eventPackage: EventPackage;
}) {
  
  return (
    <div className="flex w-[420px] mb-8">
      <img
        className="object-cover h-[120px] w-[200px] rounded-2xl"
        src={eventPackage.thumbnailUrl}
      />
      <div className="ml-4 w-[200px] flex flex-col justify-between">
        <div>
          <p className="text-md font-semibold text-left">
            {eventPackage.title}
          </p>
          <p className="text-sm line-clamp-3 text-left">
            {eventPackage.description}
          </p>
        </div>

        <div className="text-tertiary flex items-center text-left	">
          <ShoppingCart size={20} />
          <p className="text-md ml-2">
            {Intl.NumberFormat("vi-vn", {
              style: "currency",
              currency: "VND",
            }).format(eventPackage.totalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
}
