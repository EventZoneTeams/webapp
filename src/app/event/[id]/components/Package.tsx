import PackageCard from "@/components/Package/PackageCard";
import { EventPackage } from "@/types/event-packages.";

export default function Package({ eventPackages }: { eventPackages: EventPackage[] }) {
  return (
    <div className="bg-muted p-6 w-fit">
      <p className=" text-2xl mb-6 font-semibold">Package</p>
      <div>
        {eventPackages?.map((eventPackage) => (
          <PackageCard eventPackage={eventPackage} />
        ))}
      </div>
    </div>
  );
}
