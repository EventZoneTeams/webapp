import { DonateSendData } from "@/api/event-campaign";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import useEventCampaign from "@/hooks/useEventCampaign";
import { useEffect, useMemo, useState } from "react";

export default function Campaign({
  campaignId,
  eventName,
}: {
  campaignId: number;
  eventName: string;
}) {
  const [progress, setProgress] = useState(0);
  const [contributionAmount, setContributionAmount] = useState(1000);
  const { getEventCampaignByIdMutation } = useEventCampaign();
  const { donateMutation } = useEventCampaign();

  useEffect(() => {
    getEventCampaignByIdMutation.mutate(campaignId);
  }, [campaignId]);

  const eventCampaign = useMemo(
    () => getEventCampaignByIdMutation.data,
    [getEventCampaignByIdMutation.data]
  );

  useEffect(() => {
    if (eventCampaign) {
      const timer = setTimeout(
        () => setProgress(eventCampaign.targetAchievementPercentage),
        500
      );
      return () => clearTimeout(timer);
    }
  }, [eventCampaign]);

  const handleAmountChange = (e: any) => {
    setContributionAmount(e.target.value);
  };

  const handleContribute = async () => {
    const sendData: DonateSendData = {
      "event-campaign-id": campaignId,
      amount: contributionAmount,
    };
    await donateMutation.mutateAsync(sendData);
    console.log("Contribute:", contributionAmount);
    setContributionAmount(0);
  };

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
            value={progress >= 100 ? 100 : progress}
            className="w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="border-r pr-3 border-[#D9D9D9]">
            <p className="text-lg font-semibold">
              {eventCampaign?.targetAchievementPercentage}%
            </p>
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

        <Dialog>
          <DialogTrigger asChild>
            <div className="mt-6 text-right">
              <Button className="">Contribute now</Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              {eventCampaign?.name}
              <DialogDescription>Donation for {eventName}</DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2 items-center">
                <Label htmlFor="campaign" className="mb-2">
                  Amount you want to contribute
                </Label>
                <div className="flex items-center">
                  <Input
                    id="campaign"
                    placeholder="VND"
                    type="number"
                    value={contributionAmount}
                    onChange={handleAmountChange}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="ml-2"
                    onClick={handleContribute}
                  >
                    Contribute
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
