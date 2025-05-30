"use client";

import { useState } from "react";
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperTitle,
  //   StepperDescription,
} from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";

type Step = {
  step: number;
  title: string;
  // description?: string;
};

type StepperComponentProps = {
  steps: Step[];
};

type StepState = "inactive" | "active" | "completed";

const StepperComponent: React.FC<StepperComponentProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const getStepState = (stepNumber: number): StepState => {
    if (stepNumber < currentStep) return "completed";
    if (stepNumber === currentStep) return "active";
    return "inactive";
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <Stepper className="relative flex w-full items-center justify-between">
        {steps.map((step, index) => {
          const state = getStepState(step.step);
          const isLastStep = index === steps.length - 1;

          return (
            <div
              key={step.step}
              className="relative flex-1 flex flex-col items-center"
            >
              {/* Connecting line to next step */}
              {!isLastStep && (
                <div
                  className={`absolute top-5 left-1/2 right-[-50%] h-0.5 z-0 rounded-full
      ${step.step < currentStep ? "bg-primary-400" : "bg-gray-300"}`}
                />
              )}

              <StepperItem
                step={step.step}
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
                    className={`z-10 shrink-0 rounded-full w-10 h-10 flex items-center justify-center text-base
      ${state === "active" ? "bg-white ring-2 ring-ring ring-offset-2 ring-offset-background" : ""}
      ${state === "completed" ? "bg-primary-400 text-white" : ""}
    `}
                    onClick={() => setCurrentStep(step.step)}
                  >
                    <span
                      className={`font-semibold text- ${
                        step.step < currentStep
                          ? "bg-primary-400 text-white"
                          : step.step === currentStep
                            ? "bg-white text-primary-400"
                            : "bg-white text-gray-400"
                      }`}
                    >
                      {step.step}
                    </span>
                  </Button>
                </StepperTrigger>

                <div className="mt-3 text-center">
                  <StepperTitle
                    className={`text-sm font-semibold lg:text-base ${
                      state === "active" ? "text-primary" : ""
                    }`}
                  >
                    {step.title}
                  </StepperTitle>
                </div>
              </StepperItem>
            </div>
          );
        })}
      </Stepper>

      <div className="mt-8 flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 1}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentStep === steps.length}>
          {currentStep === steps.length ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default StepperComponent;
