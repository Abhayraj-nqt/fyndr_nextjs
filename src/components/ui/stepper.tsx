"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const Stepper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex", className)} {...props} />
));
Stepper.displayName = "Stepper";

const StepperItem = React.forwardRef<
  HTMLDivElement,
  { step: number } & React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative", className)} {...props} />
));
StepperItem.displayName = "StepperItem";

const StepperSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "h-0.5 w-full bg-muted data-[state=completed]:bg-primary",
      className
    )}
    {...props}
  />
));
StepperSeparator.displayName = "StepperSeparator";

const StepperTrigger = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(className)} {...props} />;
});
StepperTrigger.displayName = "StepperTrigger";

const StepperTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-medium text-muted-foreground", className)}
    {...props}
  />
));
StepperTitle.displayName = "StepperTitle";

const StepperDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
StepperDescription.displayName = "StepperDescription";

export {
  Stepper,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
  StepperTitle,
  StepperDescription,
};
