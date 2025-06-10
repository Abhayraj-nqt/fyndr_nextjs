import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Info, Store } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "../ui/button";
import ExternalLinkConfirm from "../ui/externallinkconfirms";

type BizInfoProps = {
  label?: string; // for address or plain text
  link?: string; // for clickable link
  icon: React.ReactNode; // for any JSX icon component (e.g., Image, svg, etc.)
  phone?: number;
  showInfo?: boolean;
  showStore?: boolean;
};

const BizInfo: React.FC<BizInfoProps> = ({
  link,
  label,
  icon,
  phone,
  showInfo,
  showStore,
}) => {
  return (
    <div className="mb-3 max-w-[96%]">
      <div className="flex justify-between">
        <div className="mt-2 flex">
          <span>{icon}</span>
          {link !== null && link !== undefined && (
            <ExternalLinkConfirm link={link} />
          )}
          {/* {phone !== undefined && isMobile() ? (
              <text onClick={() => callback(true)}>{phone}</text>
            ) : (
              <text onClick={() => callback(true)}>{phone}</text>
            )} */}
          {label !== undefined && (
            <span className="cursor-pointer text-sm font-normal leading-5 text-black-80">
              {label}
            </span>
          )}
          {showInfo && (
            <Popover>
              <PopoverTrigger asChild>
                <span className="ml-2 cursor-pointer text-blue-600">
                  <Info className="size-4" />
                </span>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-96 text-sm font-normal">
                This is the sharable URL of the campaign
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div>
          {!phone && showStore && (
            <Button
              onClick={() => {
                alert("this is store");
              }}
              variant="default"
              className="mt-3 rounded-5 pl-2.5"
            >
              <Image
                src={"/images/invoice/Store.svg"}
                alt="store"
                width={20}
                height={20}
                className="inline-block"
              />
              View Store
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BizInfo;
