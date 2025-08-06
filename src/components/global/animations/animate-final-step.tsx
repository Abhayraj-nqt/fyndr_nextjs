"use client";

import Image from "next/image";
import React, { useState } from "react";

import ASSETS from "@/constants/assets";
import { cn } from "@/lib/utils";

import { MotionDiv } from "./motion-elements";

type Props = {
  imgURL?: string;
  message?: React.ReactNode;
  imgClassName?: string;
  className?: string;
  animationDelay?: number;
  onAnimationComplete?: () => void;
};

const AnimateFinalStep = ({
  imgURL = ASSETS.ICONS.TICK.FILLED_GREEN,
  message,
  className = "",
  imgClassName = "",
  animationDelay = 0,
  onAnimationComplete,
}: Props) => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center justify-center w-full min-h-72",
        className
      )}
    >
      {/* Animate layout changes inside this MotionDiv */}
      <MotionDiv
        layout
        className={cn(
          "flex items-center justify-center",
          showMessage ? "flex-col gap-4" : ""
        )}
        transition={{
          layout: {
            duration: 0.4,
            // ease: [0.25, 0.46, 0.45, 0.94],
            // ease: [1, 1, 1, 1],
          },
        }}
      >
        {imgURL ? (
          <MotionDiv
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.8, 1.2],
              opacity: [0, 1, 1],
            }}
            transition={{
              delay: animationDelay,
              duration: 1.2,
              times: [0, 0.6, 1],
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex items-center justify-center"
            onAnimationComplete={() => {
              onAnimationComplete?.();
              if (message && !showMessage) {
                setTimeout(() => setShowMessage(true), 100);
              }
            }}
          >
            <Image
              src={imgURL}
              alt="animated-icon"
              height={60}
              width={60}
              className={cn("", imgClassName)}
            />
          </MotionDiv>
        ) : null}

        {message && showMessage && (
          <MotionDiv
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-center"
          >
            {message}
          </MotionDiv>
        )}
      </MotionDiv>
    </div>
  );
};

export default AnimateFinalStep;
