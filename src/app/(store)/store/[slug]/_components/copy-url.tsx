"use client";

import React, { useEffect, useState } from "react";

import CopyToClipboard from "@/components/global/copy-to-clipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  children: React.ReactNode;
};

const TOOLTIP_MSG = "Copy url";

const CopyUrl = ({ children }: Props) => {
  const [tooltipText, setTooltipText] = useState<string>(TOOLTIP_MSG);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  const handleClick = () => {
    setIsTooltipOpen(true);
    setTooltipText("Copied!");

    setTimeout(() => {
      setTooltipText(TOOLTIP_MSG);
    }, 3000);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const url = window.location.href;
      setCurrentUrl(url);
    }
  }, [mounted]);

  return (
    <TooltipProvider>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger>
          <CopyToClipboard text={currentUrl}>
            <div onClick={handleClick}>{children}</div>
          </CopyToClipboard>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyUrl;
