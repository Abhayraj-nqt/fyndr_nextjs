import React, { ReactNode } from "react";

import Footer from "@/components/global/navigation/footer";
import Navbar from "@/components/global/navigation/navbar";
import DashboardSidebar from "@/components/global/navigation/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ADMIN_MENU } from "@/constants/menu";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const SidebarHeader = <>Vishesh</>;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="flex min-h-screen flex-1 flex-col bg-light-800">
        <div className="">
          <main className="flex min-h-0 flex-col">
            <SidebarProvider>
              <DashboardSidebar
                header={SidebarHeader}
                sidebarLinks={ADMIN_MENU}
              />
              <main className="w-full">
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </main>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AdminLayout;
