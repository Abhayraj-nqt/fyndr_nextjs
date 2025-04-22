import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SubMenuProps } from "@/constants/menu";

interface Props {
  sidebarLinks: SubMenuProps[];
  header: React.ReactElement;
}

const DashboardSidebar = ({ sidebarLinks, header }: Props) => {
  return (
    <Sidebar
      collapsible="icon"
      side="left"
      className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-none bg-light-900 shadow-none"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>{header}</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarLinks.map(
            ({ hasSubMenu, label, route, icon: MenuIcon, subMenu }) =>
              hasSubMenu ? (
                <Collapsible key={label} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {MenuIcon && <MenuIcon />}
                        <span>{label}</span>
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {subMenu?.map(
                        ({
                          label: subLabel,
                          route: subRoute,
                          icon: SubIcon,
                        }) => (
                          <SidebarMenuSub key={subLabel}>
                            <SidebarMenuSubItem>
                              <SidebarMenuButton asChild>
                                <Link href={subRoute}>
                                  {SubIcon && <SubIcon />}
                                  <span>{subLabel}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        )
                      )}
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton asChild>
                    <Link href={route}>
                      {MenuIcon && <MenuIcon />}
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
