import React from "react";

export type DashboardCardProps = {
  title: string;
  value: number;
  icon?: React.ReactNode;
};

export default function Dashboardcard({
  title,
  value,
  icon,
}: DashboardCardProps) {
  return (
    <div className="p-4 rounded-lg border bg-background flex-1 space-y-4">
      <div className="text-sm flex items-center gap-4">
        <p className="flex-1">{title}</p>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
