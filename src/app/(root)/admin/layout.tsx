import React, { ReactNode } from "react";

import DashboardSidebar from "@/components/global/navigation/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ADMIN_MENU } from "@/constants/menu";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const SidebarHeader = <>Vishesh</>;

  return (
    <main className="relative">
      <SidebarProvider>
        <DashboardSidebar header={SidebarHeader} sidebarLinks={ADMIN_MENU} />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </main>
  );
};

export default AdminLayout;
