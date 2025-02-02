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
  categories: Category[];
}

const OfferFilter = async ({ categories }: Props) => {
  return (
    <Sidebar
      side="left"
      className="top-16 border-none bg-light-900 shadow-none"
    >
      <SidebarHeader>
        <SidebarMenu className="px-2">
          <SidebarMenuItem>Filters</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="no-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="paragraph-semibold mb-2 text-primary-900">
            Deals on map
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              <SidebarMenuItem></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="paragraph-semibold mb-2 text-primary-900">
            Range (50 miles)
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              <Slider defaultValue={[50]} max={100} step={1} className={cn()} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="paragraph-semibold mb-2 text-primary-900">
            Mode
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              <RadioGroup defaultValue="online" className="space-y-2">
                <SidebarMenuItem className="body-medium flex items-center gap-2">
                  <RadioGroupItem
                    value="online"
                    id="online"
                    className="data-[state=checked]:bg-primary-900"
                  />
                  <Label htmlFor="online">Online</Label>
                </SidebarMenuItem>
                <SidebarMenuItem className="body-medium flex items-center gap-2">
                  <RadioGroupItem
                    value="offline"
                    id="offline"
                    className="data-[state=checked]:bg-primary-900"
                  />
                  <Label htmlFor="offline">Offline</Label>
                </SidebarMenuItem>
              </RadioGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="paragraph-semibold mb-2 text-primary-900">
            Sort
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4 px-2">
              <RadioGroup
                defaultValue="Distance: Closest First"
                className="space-y-2"
              >
                <SidebarMenuItem className="body-medium flex items-center gap-2">
                  <RadioGroupItem
                    value="Distance: Closest First"
                    id="Distance: Closest First"
                    className="data-[state=checked]:bg-primary-900"
                  />
                  <Label htmlFor="Distance: Closest First">
                    Distance: Closest First
                  </Label>
                </SidebarMenuItem>
                <SidebarMenuItem className="body-medium flex items-center gap-2">
                  <RadioGroupItem
                    value="Distance: Farthest First"
                    id="Distance: Farthest First"
                    className="data-[state=checked]:bg-primary-900"
                  />
                  <Label htmlFor="Distance: Farthest First">
                    Distance: Farthest First
                  </Label>
                </SidebarMenuItem>
              </RadioGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="paragraph-semibold mb-2 text-primary-900">
            Type of deals
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4 px-2">
              {/* <SidebarMenuItem className="body-medium flex items-center gap-2">
                <Checkbox id={`ALL`} className="data-[state=checked]:bg-primary-900" />
                <label htmlFor={`ALL`} className="cursor-pointer leading-none">
                  ALL
                </label>
              </SidebarMenuItem> */}
              <SidebarMenuItem className="body-medium flex items-center gap-2">
                <Checkbox
                  id={`COUPONS`}
                  className="data-[state=checked]:bg-primary-900"
                />
                <label
                  htmlFor={`COUPONS`}
                  className="cursor-pointer leading-none"
                >
                  Coupons
                </label>
              </SidebarMenuItem>
              <SidebarMenuItem className="body-medium flex items-center gap-2">
                <Checkbox
                  id={`OFFERS`}
                  className="data-[state=checked]:bg-primary-900"
                />
                <label
                  htmlFor={`OFFERS`}
                  className="cursor-pointer leading-none"
                >
                  Offers
                </label>
              </SidebarMenuItem>
              <SidebarMenuItem className="body-medium flex items-center gap-2">
                <Checkbox
                  id={`EVENTS`}
                  className="data-[state=checked]:bg-primary-900"
                />
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
          <SidebarGroupLabel className="paragraph-semibold mb-2 text-primary-900">
            Category
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4 px-2">
              {categories &&
                categories?.length > 0 &&
                categories?.map((category) => (
                  <SidebarMenuItem
                    key={category.objid}
                    className="body-medium flex items-center gap-2"
                  >
                    <Checkbox
                      id={`${category.objid}`}
                      className="data-[state=checked]:bg-primary-900"
                    />
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
