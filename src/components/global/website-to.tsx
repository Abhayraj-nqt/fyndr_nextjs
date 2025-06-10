"use client";

import { CircleAlert } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import Button from "./buttons";

type Props = {
  children: React.ReactNode;
  url: string;
};

const WebsiteTo = ({ children, url }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        <p className="body-3 flex gap-2 text-black-60">
          <span className="mt-[3px] text-yellow-500">
            <CircleAlert size={15} />
          </span>{" "}
          <span>
            You are visiting the link {url} outside Fyndr domain that is not
            verified or secured by Fyndr, do you want to continue?
          </span>
        </p>
        <div className="flex w-full justify-end gap-1">
          <Link target="_blank" href={url}>
            <Button
              variant="primary"
              className="body-3 h-7 !rounded-5 px-2 py-1"
            >
              Yes
            </Button>
          </Link>
          <Button
            variant="primary-outlined"
            className="body-3 h-7 !rounded-5 px-2 py-1"
            onClick={() => setOpen(false)}
          >
            No
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WebsiteTo;
