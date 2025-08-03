import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import LocalSearch from "@/components/global/search/local-search";
import { GetStoreDetailsResponse } from "@/types/store/store.response";

import StoreItemCard from "./store-item-card";

type Props = {
  businessName: string;
  storeItems: GetStoreDetailsResponse["catalogueItems"];
};

const StoreItemSection = ({ businessName, storeItems }: Props) => {
  return (
    <DefaultCard className="p-0">
      <div className="heading-6-medium border-b border-secondary-20 p-4 text-secondary">
        Order at {businessName}
      </div>
      <div className="flex flex-col gap-4 p-4">
        <LocalSearch route="/" placeholder="Search here" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {storeItems.map((storeItem) => (
            <StoreItemCard key={storeItem.objid} storeItem={storeItem} />
          ))}
        </div>
      </div>
    </DefaultCard>
  );
};

export default StoreItemSection;
