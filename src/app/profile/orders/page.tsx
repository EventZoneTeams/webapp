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
import useWallet from "@/hooks/useWallet";
import Tabs from "./components/Tabs";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const { getMyOrderMutation } = useEventOrder();
  const { purchaseOrderMutation } = useWallet();

  useEffect(() => {
    getMyOrderMutation.mutate();
  }, []);

  const eventOrder = useMemo(
    () => getMyOrderMutation.data,
    [getMyOrderMutation.data]
  );

  const handlePayOrder = (orderId: number) => {
    purchaseOrderMutation.mutate(orderId);
  };

  return (
    <main className=" min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
        <Tabs />
        {eventOrder?.data?.map((order) => (
          <div key={order.id} className="mb-6 border rounded-lg">
            <div className="p-6 border-b flex justify-between items-center">
              <div className="flex justify-between">
                <div className="">
                  <p className="font-medium text-gray-500">OrderID:</p>
                  <p className="text-tertiary text-2xl font-semibold">
                    #{order.id}
                  </p>
                </div>
                <div className="">
                  <Badge
                    variant={
                      order.status === "PENDING" ? "default" : "secondary"
                    }
                    className="shadow-md text-md w-24 flex justify-center"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
              <Button onClick={() => handlePayOrder(order.id)}>
                Pay Order
              </Button>
            </div>
            <Collapsible>
              <CollapsibleTrigger className="p-6 cursor-pointer">
                <div className="flex space-x-4">
                  {order.eventOrderDetails.map((eventOrder) => (
                    <PackageByIdCard
                      key={eventOrder.id}
                      eventPackageId={eventOrder.packageId}
                    />
                  ))}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-6">
                <div className="flex space-x-4">
                  {order.eventOrderDetails.map((eventOrder) => (
                    <div key={eventOrder.id} className="flex-1">
                      <PackageByIdCard eventPackageId={eventOrder.packageId} />
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </main>
  );
}
