import React, { ReactNode } from "react";

import DashboardSidebar from "@/components/navigation/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BUSINESS_MENU } from "@/constants/menu";

const BusinessLayout = ({ children }: { children: ReactNode }) => {
  const SidebarHeader = <>Prachi</>;

  return (
    <main className="relative">
      <SidebarProvider>
        <DashboardSidebar header={SidebarHeader} sidebarLinks={BUSINESS_MENU} />
        {/* <main>
          <SidebarTrigger /> */}
        {children}
        {/* </main> */}
      </SidebarProvider>
    </main>
  );
};

export default BusinessLayout;
