import useEventPackage from "@/hooks/useEventPackage";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";

export default function PackageCard({ id }: { id: number }) {
  const { getEventPackageByIdMutation } = useEventPackage();

  useEffect(() => {
    getEventPackageByIdMutation.mutate(id);
  }, [id]);

  const packageData = useMemo(
    () => getEventPackageByIdMutation.data?.data,
    [getEventPackageByIdMutation.data]
  );
  return (
    packageData && (
      <div className="bg-background p-2 rounded-md shadow-md">
        <div className="flex gap-4">
          <div className="h-20 aspect-video relative">
            <Image
              src={packageData.thumbnailUrl}
              alt={packageData.description}
              className="w-full h-full object-cover rounded-md"
              width={160}
              height={90}
            />
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-xl">
              {packageData.description}
            </div>
            <div className="text-gray-500">
              {packageData.productsInPackage.length} products
            </div>
            <div className="">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(packageData.totalPrice)}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
