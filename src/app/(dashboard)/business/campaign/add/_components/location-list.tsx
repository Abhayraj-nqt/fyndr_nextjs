"use client";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LocationData } from "@/types/location";
import { useUserStore } from "@/zustand/stores/user.store";

import LocationListItem from "./location-list-item";
import List from "../../../_components/list";

const LocationList = () => {
  const { userData } = useUserStore();
  const locations = userData?.locations;

  const [allLocations, setAllLocation] = useState<LocationData[]>([]);
  useEffect(() => {
    if (Array.isArray(locations)) {
      const tempData = locations.map((item, index) => ({
        ...item,
        key: index,
      }));
      setAllLocation(tempData);
    }
  }, [locations]);

  return (
    <>
      <DefaultCard className="no-scrollbar m-4 h-[533px] w-full max-w-[900px] flex-col overflow-scroll border-solid bg-white p-[23px] outline-black">
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <Checkbox />
            <Label className="ml-2">All Locations</Label>
          </div>
          <div>
            <Button className="bg-primary font-roboto text-sm text-white hover:bg-primary">
              Add Locations <Plus className="text-white" />
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <List
            dataSource={allLocations || locations}
            renderItem={(item, index) => {
              return <LocationListItem item={item} index={index} />;
            }}
          />
        </div>
      </DefaultCard>
    </>
  );
};

export default LocationList;
