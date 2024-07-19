"use client";

import useEventCampaign from "@/hooks/useEventCampaign";
import React, { useEffect, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import useUser from "@/hooks/useUser";
import { getUserById } from "@/api/user";
import { User } from "@/types/authuser";

export default function page({ params }: { params: { id: string } }) {
  const { getEventCampaignByEventIdMutation } = useEventCampaign();
  const { getUserByIdMutation } = useUser();
  useEffect(() => {
    getEventCampaignByEventIdMutation.mutate(Number(params.id));
  }, [params]);

  const campaign = useMemo(() => {
    return getEventCampaignByEventIdMutation.data;
  }, [getEventCampaignByEventIdMutation.data]);

  console.log(campaign);

  return campaign ? (
    <div className="p-4">
      <div className="bg-background rounded-md p-4">
        <div className="flex items-center gap-4">
          <p>{campaign[0].name}</p>
          <Badge className="">{campaign[0].status}</Badge>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">
            <span>Collected: </span>
            <span>
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(campaign[0].collectedAmount)}
            </span>
            <span> / </span>
            <span>
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(campaign[0].goalAmount)}
            </span>
          </div>
          <Progress
            value={(campaign[0].collectedAmount / campaign[0].goalAmount) * 100}
            max={campaign[0].goalAmount}
            indicatorColor="bg-gradient-to-r from-primary to-tertiary"
            className="mt-4"
          />
        </div>
        <div className="mt-4 text-gray-500">
          <div className="flex items-center gap-4">
            <span>{format(campaign[0].startDate, "Pp")}</span>
            <span>-</span>
            <span>{format(campaign[0].endDate, "Pp")}</span>
          </div>
        </div>
      </div>
      <dl className="-my-3 divide-y divide-border text-sm mt-4">
        {campaign[0].eventDonations.map((donation, index) => {
          console.log(donation);
          return (
            <div
              className="grid grid-cols-3 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
              key={index}
            >
              <div className="col-span-1">{donation.userId}</div>
              <div className="col-span-1">
                +
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(donation.amount)}
              </div>
              <div className="col-span-1">
                {format(donation.createdAt, "Pp")}
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  ) : (
    <div className="text-center">No donation</div>
  );
}
