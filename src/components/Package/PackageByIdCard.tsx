import useEventPackage from "@/hooks/useEventPackage";
import { ShoppingCart } from "lucide-react";
import { useEffect, useMemo } from "react";

export default function PackageByIdCard({
  eventPackageId,
}: {
  eventPackageId: number;
}) {
  const { getEventPackageByIdMutation } = useEventPackage();

  useEffect(() => {
    getEventPackageByIdMutation.mutate(Number(eventPackageId));
  }, [eventPackageId]);

  const eventPackage = useMemo(
    () => getEventPackageByIdMutation.data,
    [getEventPackageByIdMutation.data]
  );

  return (
    eventPackage && (
      <div className="flex w-[420px] mt-8">
        <img
          className="object-cover h-[120px] w-[200px] rounded-2xl"
          src={eventPackage?.data.thumbnailUrl}
        />
        <div className="ml-4 w-[200px] flex flex-col justify-between">
          <div>
            <p className="text-md font-semibold text-left">
              {eventPackage?.data.title}
            </p>
            <p className="text-sm line-clamp-3 text-left">
              {eventPackage?.data.description}
            </p>
          </div>

          <div className="text-tertiary flex items-center text-left	">
            <ShoppingCart size={20} />
            <p className="text-md ml-2">
              {Intl.NumberFormat("vi-vn", {
                style: "currency",
                currency: "VND",
              }).format(eventPackage?.data.totalPrice)}
            </p>
          </div>
        </div>
      </div>
    )
  );
}
