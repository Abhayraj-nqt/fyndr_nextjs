"use client";

import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperTitle,
} from "@/components/ui/stepper";

type Step = {
  step: string;
  title: string;
};

type StepState = "inactive" | "active" | "completed";

type Props = {
  steps: Step[];
  currentStep: string;
  onStepClick?: (step: string) => void;
  children?: React.ReactNode;
};

const StepperComponent = ({
  steps,
  currentStep,
  onStepClick,
  children,
}: Props) => {
  const getStepState = (stepNum: string): StepState => {
    const current = parseInt(currentStep);
    const step = parseInt(stepNum);
    if (step < current) return "completed";
    if (step === current) return "active";
    return "inactive";
  };

  return (
    <div className="w-full">
      <Stepper className="relative flex w-full items-center justify-between">
        {steps.map((step, index) => {
          const state = getStepState(step.step);
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.step}
              className="relative flex min-h-[80px] flex-1 flex-col items-center"
            >
              {!isLast && (
                <div
                  className={`absolute -right-1/2 left-1/2 top-4 z-0 h-px rounded-full
                    ${state === "completed" ? "bg-primary" : "bg-gray-300"}`}
                />
              )}

              <StepperItem
                step={parseInt(step.step)}
                className="z-10 flex flex-col items-center"
              >
                <StepperTrigger asChild>
                  <Button
                    variant={
                      state === "completed" || state === "active"
                        ? "default"
                        : "outline"
                    }
                    size="icon"
                    className={`z-10 flex size-8 items-center justify-center rounded-full text-base text-gray-400
                      ${state === "active" ? "bg-white ring-2 ring-offset-2 hover:bg-white" : ""}
                      ${state === "completed" ? "bg-primary text-white hover:bg-primary" : ""}`}
                    onClick={() => onStepClick?.(step.step)}
                  >
                    {step.step}
                  </Button>
                </StepperTrigger>

                <div className="mt-2 w-full max-w-[70px] text-center">
                  <StepperTitle
                    className={`font-roboto text-sm ${state === "active" ? "text-primary" : ""}  ${state === "completed" ? "text-primary" : "text-black-40"}`}
                  >
                    {step.title}
                  </StepperTitle>
                </div>
              </StepperItem>
            </div>
          );
        })}
      </Stepper>

      <div className="my-6 mt-11 w-full">{children}</div>
    </div>
  );
};

export default StepperComponent;
