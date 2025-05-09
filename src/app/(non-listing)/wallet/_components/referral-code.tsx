"use client";

import { Clipboard } from "lucide-react";
import { useState } from "react";

import CopyToClipboard from "@/components/global/copy-to-clipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  referralCode: string;
};

const TOOLTIP_MSG = "Copy referral code";

const ReferralCode = ({ referralCode }: Props) => {
  const [tooltipText, setTooltipText] = useState<string>(TOOLTIP_MSG);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsTooltipOpen(true);
    setTooltipText("Copied!");

    setTimeout(() => {
      setTooltipText(TOOLTIP_MSG);
    }, 3000);
  };

  return (
    <div className="flex gap-2 self-start rounded-full bg-primary-600 p-4">
      <p className="body-regular">Your referral code : Book</p>
      <TooltipProvider>
        <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
          <TooltipTrigger asChild>
            <div>
              <CopyToClipboard
                text={referralCode}
                className="flex items-center justify-center"
              >
                <Clipboard
                  size={20}
                  className="cursor-pointer"
                  onClick={handleClick}
                />
              </CopyToClipboard>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ReferralCode;
