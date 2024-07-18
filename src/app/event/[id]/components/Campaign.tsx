import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function Campaign({ eventId }: { eventId: number }) {
  const [progress, setProgress] = useState(0);
  const calculateProgress = (300000 / 3000000) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(calculateProgress), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" p-6 w-full">
      <p className=" text-2xl mb-6 font-semibold">Campaign</p>
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
            }).format(300000)}
          </p>
          <p>
            {Intl.NumberFormat("vi-vn", {
              style: "currency",
              currency: "VND",
            }).format(3000000)}
          </p>
        </div>
        <div className="mt-3">
          <Progress
            indicatorColor="bg-tertiary"
            value={progress}
            className="w-[100%]"
          />
        </div>
        <div className="mt-1 flex justify-between ">
          <div>
            <p className="text-lg">{calculateProgress}%</p>
            <p className="text-sm">of goal</p>
          </div>
          <p></p>
        </div>
      </div>
    </div>
  );
}
