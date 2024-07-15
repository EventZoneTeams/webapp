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
        src={
          eventPackage.productsInPackage[0].eventProduct.productImages[0]
            .imageUrl
        }
      />
      <div className="ml-4 w-[200px] flex flex-col justify-between">
        <p className="text-md line-clamp-3">{eventPackage.description}</p>

        <div className="text-tertiary flex items-center">
          <ShoppingCart size={20} />
          <p className="text-md ml-2">{eventPackage.totalPrice}</p>
        </div>
      </div>
    </div>
  );
}
