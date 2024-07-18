"use client";

import useEventOrder from "@/hooks/useEventOrder";
import { useEffect, useMemo } from "react";
import PackageByIdCard from "@/components/Package/PackageByIdCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export default function page() {
  const { getMyOrderMutation } = useEventOrder();

  useEffect(() => {
    getMyOrderMutation.mutate();
  }, []);

  const eventOrder = useMemo(
    () => getMyOrderMutation.data,
    [getMyOrderMutation.data]
  );

  return (
    <main>
      <div className="container mx-auto p-4">
        {eventOrder?.data?.map((order) => (
          <Collapsible className="mb-4 border-b" key={order.id} asChild>
            <div className="p-6 rounded-lg shadow-md ">
             <div className="flex justify-between items-center">
                <CollapsibleTrigger asChild className="cursor-pointer">
                    <div className="w-full">
                      <div className="flex">
                        <p>Event ID:</p>
                        <p className="ml-1">{order.eventId}</p>
                      </div>
                      <div className="flex">
                        <p>Order ID:</p>
                        <p className="ml-1">{order.id}</p>
                      </div>
                      <div className="flex">
                        <p>Total amount:</p>
                        <p className="ml-1">{order.totalAmount}</p>
                      </div>
                      <div className="flex">
                        <p>Status:</p>
                        <p className="ml-1">{order.status}</p>
                      </div>
                    </div>
                </CollapsibleTrigger>
                <Button>Pay order</Button>
             </div>
              <CollapsibleContent>
                {order.eventOrderDetails.map((eventOrder) => (
                  <div key={eventOrder.id} className="">
                    <PackageByIdCard eventPackageId={eventOrder.packageId} />
                  </div>
                ))}
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </main>
  );
}
