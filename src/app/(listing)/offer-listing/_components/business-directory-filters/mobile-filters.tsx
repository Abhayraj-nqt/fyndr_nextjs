import { ArrowDownUp, ListFilter, MapPinned } from "lucide-react";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import BusinessDirectoryFilters from ".";

const MobileFilters = () => {
  return (
    <Sheet>
      <div className="flex-center fixed left-0 top-16 flex h-9 w-full justify-evenly border border-light-700 bg-light-900 text-light-300">
        <div className="flex-center h-full w-4/12 border-r border-light-700">
          <SheetTrigger className="flex-center body-regular flex cursor-pointer gap-2">
            <ListFilter size={18} /> <div>Filters</div>
          </SheetTrigger>
        </div>
        <div className="flex-center h-full w-4/12 border-r border-light-700">
          <div className="flex-center body-regular flex cursor-pointer gap-2">
            <ArrowDownUp size={18} /> <div>Sort</div>
          </div>
        </div>
        <div className="flex-center h-full w-4/12 border-r border-light-700">
          <div className="flex-center body-regular flex cursor-pointer gap-2">
            <MapPinned size={18} /> <div>Location</div>
          </div>
        </div>
      </div>
      <SheetContent side={"left"} className="border-none bg-light-900">
        <SheetTitle className="hidden">Filters</SheetTitle>
        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <BusinessDirectoryFilters />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
