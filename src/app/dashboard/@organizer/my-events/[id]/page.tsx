"use client";

import { DashboardCardProps } from "@/components/DashboardCard";
import DashboardCardList from "@/components/DashboardCard/DashboardCardList";
import { AreaChartStacked } from "@/components/Example/Charts/AreaChartStacked";
import { PieChartComponent } from "@/components/Example/Charts/PieChart";
import useEvent from "@/hooks/useEvent";
import { Package } from "lucide-react";
import { useEffect } from "react";

const cards: DashboardCardProps[] = [
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
  useEffect(() => {
    getEventByIdMutation.mutate(Number(params.id));
  }, [params.id]);

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
