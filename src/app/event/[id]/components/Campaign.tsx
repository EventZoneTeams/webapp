import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import useEventCampaign from "@/hooks/useEventCampaign";
import { useEffect, useMemo, useState } from "react";

export default function Campaign({ campaignId }: { campaignId: number }) {
  const [progress, setProgress] = useState(0);
  const { getEventCampaignByIdMutation } = useEventCampaign();

  useEffect(() => {
    getEventCampaignByIdMutation.mutate(campaignId);
  }, [campaignId]);

  const eventCampaign = useMemo(
    () => getEventCampaignByIdMutation.data,
    [getEventCampaignByIdMutation.data]
  );

  useEffect(() => {
    if (eventCampaign) {
      const calculateProgress =
        (eventCampaign.collectedAmount / eventCampaign.goalAmount) * 100;
      const timer = setTimeout(() => setProgress(calculateProgress), 500);
      return () => clearTimeout(timer);
    }
  }, [eventCampaign]);

  return (
    <div className=" p-6 w-[500px]">
      <p className=" text-2xl mb-6 font-semibold">{eventCampaign?.name}</p>
      <div className="w-full">
        <div className="text-lg flex justify-between">
          <p>RAISED</p>
          <p>GOAL</p>
        </div>
        <div className="text-xl mt-1 flex justify-between font-bold">
          <p>
            {Intl.NumberFormat("vi-vn", {
              style: "currency",
              currency: "VND",
            }).format(eventCampaign?.collectedAmount || 0)}
          </p>
          <p>
            {Intl.NumberFormat("vi-vn", {
              style: "currency",
              currency: "VND",
            }).format(eventCampaign?.goalAmount || 0)}
          </p>
        </div>
        <div className="mt-3">
          <Progress
            indicatorColor="bg-tertiary"
            value={progress}
            className="w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="border-r pr-3 border-[#D9D9D9]">
            <p className="text-lg font-semibold">{progress}%</p>
            <p className="text-sm text-[#D9D9D9]">of goal</p>
          </div>
          <div className="border-r pr-3 border-[#D9D9D9]">
            <p className="text-lg font-semibold">
              {eventCampaign?.totalDonors}
            </p>
            <p className="text-sm text-[#D9D9D9]">contributors</p>
          </div>
          <div className="border-r pr-3 border-[#D9D9D9]">
            <p className="text-lg font-semibold">
              {Intl.NumberFormat("vi-vn", {
                style: "currency",
                currency: "VND",
              }).format(eventCampaign?.averageDonationAmount || 0)}
            </p>
            <p className="text-sm text-[#D9D9D9]">average contribution</p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              {Intl.NumberFormat("vi-vn", {
                style: "currency",
                currency: "VND",
              }).format(eventCampaign?.highestDonationAmount || 0)}
            </p>
            <p className="text-sm text-[#D9D9D9]">top contribution</p>
          </div>
        </div>
        <div className="mt-6 text-right">
          <Button className="">Contribute now</Button>
        </div>
      </div>
    </div>
  );
}
