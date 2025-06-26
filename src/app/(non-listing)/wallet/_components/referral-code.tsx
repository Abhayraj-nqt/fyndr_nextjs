"use client";

import { Clipboard } from "lucide-react";
import { useEffect, useState } from "react";

import CopyToClipboard from "@/components/global/copy-to-clipboard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/hooks/auth";

const TOOLTIP_MSG = "Copy referral code";

const ReferralCode = () => {
  const [tooltipText, setTooltipText] = useState<string>(TOOLTIP_MSG);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const { user, isLoading, error } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading)
    return (
      <div className="flex gap-2 self-start rounded-full bg-secondary-90 p-4">
        <Skeleton className="h-4 w-32 bg-white/20" />
        <Skeleton className="size-5 bg-white/20" />
      </div>
    );
  if (error) return <div>Error loading profile</div>;
  if (!user) return <div>Please sign in</div>;

  const referralCode = user?.referralCode || "";

  const handleClick = () => {
    setIsTooltipOpen(true);
    setTooltipText("Copied!");

    setTimeout(() => {
      setTooltipText(TOOLTIP_MSG);
    }, 3000);
  };

  return (
    <div className="flex gap-2 self-start rounded-full bg-secondary-90 p-4">
      <p className="body-regular">Your referral code : {`${referralCode}`}</p>
      <TooltipProvider>
        <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
          <TooltipTrigger asChild>
            <div className="flex-center">
              <CopyToClipboard
                text={`${referralCode}`}
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
