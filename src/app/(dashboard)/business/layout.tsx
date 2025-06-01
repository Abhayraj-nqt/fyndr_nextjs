import React, { ReactNode } from "react";

import Footer from "@/components/global/navigation/footer";
import Navbar from "@/components/global/navigation/navbar";
import DashboardSidebar from "@/components/global/navigation/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BUSINESS_MENU } from "@/constants/menu";

const BusinessLayout = ({ children }: { children: ReactNode }) => {
  const SidebarHeader = <>Prachi</>;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="flex min-h-screen flex-1 flex-col bg-secondary-10">
        <div className="">
          <div className="flex min-h-0 flex-col">
            <SidebarProvider>
              <DashboardSidebar
                header={SidebarHeader}
                sidebarLinks={BUSINESS_MENU}
              />
              <SidebarTrigger />
              {children}
            </SidebarProvider>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BusinessLayout;
