import { ArrowDownUp, ListFilter } from "lucide-react";
import React from "react";

import { Modal } from "@/components/global/modal";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Distance from "./distance";

import OfferFilters from ".";

const MobileFilters = () => {
  return (
    <Sheet>
      <div className="fixed left-0 top-16 grid h-10 w-full grid-cols-2 justify-evenly gap-px border bg-secondary-20 text-secondary-80">
        <SheetTrigger className="flex-center body-regular flex cursor-pointer gap-2 bg-white">
          <ListFilter size={18} /> <div>Filters</div>
        </SheetTrigger>
        <Modal
          trigger={
            <div className="flex-center body-regular flex cursor-pointer gap-2 bg-white">
              <ArrowDownUp size={18} /> <div>Sort</div>
            </div>
          }
          title={<div className="text-left">Sort</div>}
        >
          <Distance className="" type="mobile" />
        </Modal>
      </div>
      <SheetContent side={"left"} className="border-none bg-white p-0">
        <SheetTitle className="hidden">Filters</SheetTitle>
        <div className="no-scrollbar flex h-full flex-col justify-between overflow-y-auto ">
          <OfferFilters />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
