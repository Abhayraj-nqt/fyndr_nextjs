"use client";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import StepperComponent from "@/components/global/stepper-component";

import { steps } from "../_components/steps";

const StepPage = () => {
  const router = useRouter();
  const { step } = useParams();
  const stepStr = Array.isArray(step) ? step[0] : step;
  if (stepStr === undefined) throw new Error("Step is undefined");
  const currentIndex = steps.findIndex((s) => s.step === stepStr);

  if (currentIndex === -1 || currentIndex > 7) return <div>Invalid</div>;

  const handleStepChange = (step: string) => {
    router.push(`/business/campaign/add/${step}`);
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      router.push(`/business/campaign/add/${steps[currentIndex + 1].step}`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      router.push(`/business/campaign/add/${steps[currentIndex - 1].step}`);
    }
  };
  const handleClose = () => {
    router.push("/business/campaign");
  };

  return (
    <>
      <div className="flex w-full flex-col gap-6 p-12 pt-6">
        <div className="flex items-center justify-between">
          <div className="size-6 w-full font-roboto text-2xl font-normal leading-9 text-primary">
            {"Create Campaign"}
          </div>
        </div>
        <DefaultCard className="flex min-h-[709px] w-full flex-col justify-between gap-11">
          <div>
            <StepperComponent
              steps={steps}
              currentStep={stepStr}
              onStepClick={handleStepChange}
            >
              <div className="flex-center min-h-40 flex-col text-black-30">
                {steps[currentIndex].component}
              </div>
            </StepperComponent>
          </div>
          <div className="flex-center gap-2">
            {currentIndex !== 0 && (
              <Button
                onClick={handlePrevious}
                stdHeight
                stdWidth
                variant="primary-outlined"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={currentIndex === steps.length - 1}
              stdHeight
              stdWidth
              variant="primary"
            >
              {currentIndex === steps.length - 1 ? "Finish" : "Next"}
            </Button>
            {currentIndex !== 0 && (
              <Button
                onClick={handleClose}
                stdHeight
                stdWidth
                variant="primary-outlined"
              >
                Close
              </Button>
            )}
          </div>
        </DefaultCard>
      </div>
    </>
  );
};

export default StepPage;
