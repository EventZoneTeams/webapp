import Dashboardcard, { DashboardCardProps } from "@/components/DashboardCard";
import { cn } from "@/lib/utils";
import React from "react";

export type DashboardCardListProps = {
  cards: DashboardCardProps[];
};

export default function DashboardCardList({ cards }: DashboardCardListProps) {
  return (
    <div className={cn("grid gap-4", `grid-cols-${cards.length}`)}>
      {cards.map((card, index) => (
        <Dashboardcard key={index} {...card} />
      ))}
    </div>
  );
}
