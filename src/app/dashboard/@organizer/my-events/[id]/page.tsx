"use client";

import { DashboardCardProps } from "@/components/DashboardCard";
import DashboardCardList from "@/components/DashboardCard/DashboardCardList";
import { AreaChartStacked } from "@/components/Example/Charts/AreaChartStacked";
import { PieChartComponent } from "@/components/Example/Charts/PieChart";
import useEvent from "@/hooks/useEvent";
import useEventOrder from "@/hooks/useEventOrder";
import useEventPackage from "@/hooks/useEventPackage";
import useEventProduct from "@/hooks/useEventProduct";
import { Coins, Package } from "lucide-react";
import { useEffect, useMemo } from "react";

let cards: DashboardCardProps[] = [
  {
    title: "Total Products",
    value: 0,
    icon: <Package size={20} />,
  },
  {
    title: "Total Packages",
    value: 0,
    icon: <Package size={20} />,
  },
  {
    title: "Total Orders",
    value: 0,
  },
];

export default function page({ params }: { params: { id: string } }) {
  const { getEventByIdMutation } = useEvent();
  const { products, setQueryObj: setQueryObjProduct } = useEventProduct();
  const { eventPackages, setQueryObj: setQueryObjPackage } = useEventPackage();
  const { orders, setQueryObj: setQueryObjOrder } = useEventOrder();
  useEffect(() => {
    getEventByIdMutation.mutate(Number(params.id));
    setQueryObjProduct({ EventId: Number(params.id) });
    setQueryObjPackage({ EventId: Number(params.id) });
    setQueryObjOrder({ id: Number(params.id) });
  }, [params.id]);

  useEffect(() => {
    if (products) {
      cards[0].value = products.length;
    }
  }, [products]);

  useEffect(() => {
    if (eventPackages) {
      cards[1].value = eventPackages.length;
    }
  }, [eventPackages]);

  useEffect(() => {
    if (orders) {
      cards[2].value = orders.length;
    }
  }, [orders]);

  return (
    <div className="py-4 space-y-4">
      <DashboardCardList cards={cards} />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <AreaChartStacked />
        </div>
        <div className="col-span-1">
          <PieChartComponent />
        </div>
      </div>
    </div>
  );
}
