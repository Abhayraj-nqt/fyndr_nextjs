import React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface ButtonsProps {
  btn1: string;
  btn2?: string | boolean;
  onClick1?: () => void;
  onClick2?: () => void;
  showPopover?: boolean;
}

export default function Buttons({
  btn1,
  btn2,
  onClick1,
  onClick2,
  showPopover,
}: ButtonsProps) {
  return (
    <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row">
      <Button
        onClick={onClick1}
        className="h-[46px] w-full rounded-[10px] border border-[#257CDB] bg-[#F4F8FD] text-[#257CDB] hover:border-[#257CDB] hover:bg-[#F4F8FD] hover:text-[#257CDB] hover:shadow-none md:w-1/2"
      >
        {btn1}
      </Button>

      <div className="w-full md:w-1/2">
        {showPopover ? (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <div>
              <p>
                In case of any issues
                <br />
                regarding disputes please contact
                <br />
                <a
                  href="mailto:admin@fyndr.us"
                  className="text-blue-600 underline"
                >
                  admin@fyndr.us
                </a>
              </p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <i className=" fa-info-circle mt-1 cursor-pointer text-blue-600" />
              </PopoverTrigger>
              <PopoverContent className="w-56 text-sm">
                Dispute can only be raised within 30 days of purchase.
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          btn2 && (
            <Button
              onClick={onClick2}
              variant="outline"
              className="h-[46px] w-full rounded-[10px] border border-[#ED0C10] bg-white px-4 py-2 text-[16px] text-[#ED0C10] hover:border-[#ED0C10] hover:bg-white hover:text-[#ED0C10]"
            >
              {btn2}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
