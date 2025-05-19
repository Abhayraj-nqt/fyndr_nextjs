"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

import CopyToClipboard from "@/components/global/copy-to-clipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  storeUrl: string;
};

const TOOLTIP_MSG = "Copy Store URL";

const StoreUrl = ({ storeUrl }: Props) => {
  const [tooltipText, setTooltipText] = useState<string>(TOOLTIP_MSG);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsTooltipOpen(true);
    setTooltipText("URL Copied!");

    setTimeout(() => {
      setTooltipText(TOOLTIP_MSG);
    }, 3000);
  };

  return (
    <TooltipProvider>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
          <div>
            <CopyToClipboard
              text={storeUrl}
              className="flex items-center justify-center"
            >
              <Copy
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
  );
};

export default StoreUrl;
