import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const InfoTooltip = ({ children }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            src={"/icons/info-icon.svg"}
            alt="info"
            height={20}
            width={20}
            className="size-4 relative"
          />
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
