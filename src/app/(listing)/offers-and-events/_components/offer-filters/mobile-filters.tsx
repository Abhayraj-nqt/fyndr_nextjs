import { ArrowDownUp, ListFilter } from "lucide-react";
import React from "react";

import { Modal } from "@/components/global/modal";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// import DealsOnMap from "./deals-on-map";
import Distance from "./distance";

import OfferFilters from ".";

const MobileFilters = () => {
  return (
    <Sheet>
      <div className="fixed left-0 top-16 grid h-10 w-full grid-cols-2 justify-evenly gap-px border bg-secondary-20 text-secondary-80">
        {/* <div className="flex-center h-full w-4/12 border-r border-secondary-20"> */}
        <SheetTrigger className="flex-center body-regular flex cursor-pointer gap-2 bg-white">
          <ListFilter size={18} /> <div>Filters</div>
        </SheetTrigger>
        {/* </div> */}
        <Modal
          trigger={
            // <div className="flex-center h-full w-4/12 border-r border-secondary-20">
            <div className="flex-center body-regular flex cursor-pointer gap-2 bg-white">
              <ArrowDownUp size={18} /> <div>Sort</div>
            </div>
            // </div>
          }
          title={<div className="text-left">Sort</div>}
        >
          <Distance className="" />
        </Modal>
        {/* <Modal
          trigger={
            <div className="flex-center h-full w-4/12 border-r border-secondary-20">
              <div className="flex-center body-regular flex cursor-pointer gap-2">
                <MapPinned size={18} /> <div>Map</div>
              </div>
            </div>
          }
          title={<div className="text-left">Deals on map</div>}
        >
          <DealsOnMap showHeading={false} />
        </Modal> */}
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
