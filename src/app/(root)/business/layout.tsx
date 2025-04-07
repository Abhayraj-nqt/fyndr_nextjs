import React, { ReactNode } from "react";

import DashboardSidebar from "@/components/global/navigation/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BUSINESS_MENU } from "@/constants/menu";

const BusinessLayout = ({ children }: { children: ReactNode }) => {
  const SidebarHeader = <>Prachi</>;

  return (
    <div className="flex min-h-0 flex-col">
      <SidebarProvider>
        <DashboardSidebar header={SidebarHeader} sidebarLinks={BUSINESS_MENU} />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default BusinessLayout;
