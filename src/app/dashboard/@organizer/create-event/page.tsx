"use client";

import { StepItem } from "@/components/stepper";
import {
  CirclePlus,
  Info,
  Landmark,
  ShieldCheck,
  CircleCheck,
} from "lucide-react";
import React from "react";

import { Step, Stepper, useStepper } from "@/components/stepper";
import BasicDetailsForm from "@/components/forms/create-event/BasicDetailsForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MoreInfoForm from "@/components/forms/create-event/MoreInfoForm";
import DonationForm from "@/components/forms/create-event/DonationForm";
import AgreeToTermAndCondition from "@/components/forms/create-event/AgreeForm";

const steps: StepItem[] = [
  {
    label: "1. Event Info",
    icon: Info,
  },
  {
    label: "2. More Info",
    icon: CirclePlus,
  },
  {
    label: "3. Donation Options",
    icon: Landmark,
  },
  {
    label: "4. Term & Conditions",
    icon: ShieldCheck,
  },
];

export default function page() {
  return (
    <div className="flex w-full flex-col gap-6 h-full">
      <Stepper
        variant="circle-alt"
        initialStep={0}
        steps={steps}
        styles={{
          "step-button-container": cn(
            "ounded-full",
            "data-[current=true]:border-tertiary data-[current=true]:text-tertiary ",
            "data-[active=true]:bg-tertiary data-[active=true]:border-tertiary",
            "data-[completed=true]:bg-tertiary data-[completed=true]:border-tertiary"
          ),
        }}
        variables={{
          "--step-icon-size": "50px",
          "--step-gap": "50px",
        }}
      >
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <BasicDetailsForm />
              </Step>
            );
          } else if (index === 1) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <MoreInfoForm />
              </Step>
            );
          } else if (index === 2) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <DonationForm />
              </Step>
            );
          } else if (index === 3) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <AgreeToTermAndCondition />
              </Step>
            );
          }
        })}
        <Final />
      </Stepper>
    </div>
  );
}

const Final = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <div className="text-xl text-green-500 flex gap-4 items-center">
            <CircleCheck className="size-10 mr-2 " /> Successfull create event
          </div>
        </div>
      )}
      {/* <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div> */}
    </>
  );
};
