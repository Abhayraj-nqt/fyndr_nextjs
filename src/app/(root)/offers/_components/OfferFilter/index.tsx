import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface Props {
  categories: category[];
}

const OfferFilter = async ({ categories }: Props) => {
  return (
    <Sidebar side="left" className="top-16">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>Filters</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="no-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel>Deals on map</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </SidebarMenuItem>
              <SidebarMenuItem>Offline</SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Range (50 miles)</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Slider defaultValue={[50]} max={100} step={1} className={cn()} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Mode</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {/* <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Compact</Label>
                </div>
              </RadioGroup> */}

              <SidebarMenuItem className="paragraph-regular flex items-center gap-2">
                Online
              </SidebarMenuItem>
              <SidebarMenuItem className="paragraph-regular flex items-center gap-2">
                Offline
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sort</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              <SidebarMenuItem className="paragraph-regular flex items-center gap-2">
                Distance: Closest First
              </SidebarMenuItem>
              <SidebarMenuItem className="paragraph-regular flex items-center gap-2">
                Distance: Farthest First
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Type of deals</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {/* <SidebarMenuItem className="paragraph-regular flex items-center gap-2">
                <Checkbox id={`ALL`} />
                <label htmlFor={`ALL`} className="cursor-pointer leading-none">
                  ALL
                </label>
              </SidebarMenuItem> */}
              <SidebarMenuItem className="paragraph-regular flex items-center gap-2">
                <Checkbox id={`COUPONS`} />
                <label
                  htmlFor={`COUPONS`}
                  className="cursor-pointer leading-none"
                >
                  Coupons
                </label>
              </SidebarMenuItem>
              <SidebarMenuItem className="paragraph-regular flex items-center gap-2">
                <Checkbox id={`OFFERS`} />
                <label
                  htmlFor={`OFFERS`}
                  className="cursor-pointer leading-none"
                >
                  Offers
                </label>
              </SidebarMenuItem>
              <SidebarMenuItem className="paragraph-regular flex items-center gap-2">
                <Checkbox id={`EVENTS`} />
                <label
                  htmlFor={`EVENTS`}
                  className="cursor-pointer leading-none"
                >
                  Events
                </label>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Category</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {categories &&
                categories?.length > 0 &&
                categories?.map((category) => (
                  <SidebarMenuItem
                    key={category.objid}
                    className="paragraph-regular flex items-center gap-2"
                  >
                    <Checkbox id={`${category.objid}`} />
                    <label
                      htmlFor={`${category.objid}`}
                      className="cursor-pointer leading-none"
                    >
                      {category.name}
                    </label>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default OfferFilter;
