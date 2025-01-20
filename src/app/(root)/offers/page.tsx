import React from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { api } from "@/lib/api";

import OfferFilter from "./_components/OfferFilter";

const Offers = async () => {
  const { data: categories } = await api.categories.getAll();

  return (
    <main className="relative">
      <SidebarProvider
        style={{
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        }}
      >
        <OfferFilter categories={categories!} />
        <main className="relative w-full p-4">
          <SidebarTrigger />

          <div className="">Hello</div>
        </main>
      </SidebarProvider>
    </main>
  );
};

export default Offers;
