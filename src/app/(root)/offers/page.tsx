import React from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { api } from "@/lib/api";

import CampaignCard from "./_components/CampaignCard";
import OfferFilter from "./_components/OfferFilter";

const Offers = async () => {
  const { data: categories } = await api.categories.getAll();

  return (
    <main className="relative">
      <SidebarProvider
        style={{
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
          "--sidebar-background": "#FFFFFF",
        }}
      >
        <OfferFilter categories={categories!} />
        <main className="relative w-full p-4">
          {/* <SidebarTrigger /> */}

          <h1 className="h3-semibold mb-4">Offers and Events on Fyndr</h1>

          <div className="grid gap-4 md:grid-cols-2">
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
          </div>
        </main>
      </SidebarProvider>
    </main>
  );
};

export default Offers;
