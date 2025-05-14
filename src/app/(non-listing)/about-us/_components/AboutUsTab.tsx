"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AboutUsMap from "./aboutusmap";
import Download from "./download";
import Faq from "./faq";
import ForFyndr from "./ForFyndr";
import ForFyndrIndv from "./ForFyndrIndv";

const AboutUsTab = () => {
  const [activeTab, setActiveTab] = useState<"business" | "individual">(
    "business"
  );
  
  return (
    <div className="w-full bg-white ">
      <div className="">
        <Tabs defaultValue="business" className="w-full ">
          <TabsList>
            <TabsTrigger
              value="business"
              className="text-[1.5vw] font-normal text-[#7a8086] data-[state=active]:text-primary-500"
              // ={(value: string) => setActiveTab(value)}
              onClick={() => setActiveTab("business")}
            >
              As a Business Owner
            </TabsTrigger>
            <TabsTrigger
              value="individual"
              className="text-[1.5vw] font-normal text-[#7a8086] data-[state=active]:text-primary-500"
              // onValueChange={(value) => setActiveTab(value)}
              onClick={() => setActiveTab("individual")}
            >
              As an Individual
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="business"
            className="mt-3  pl-16 pr-6 text-[1.7vw] font-normal text-[#7a8086]"
          >
            <ForFyndr />
          </TabsContent>
          <TabsContent
            value="individual"
            className="mt-3 pl-16 pr-6 text-[1.7vw] font-normal text-[#7a8086]"
          >
            <ForFyndrIndv />
          </TabsContent>
        </Tabs>
      </div>
      <section className="flex justify-center  bg-black py-12">
        <AboutUsMap />
      </section>

      <section className="flex justify-center">
        <Download />
      </section>

      <section className="flex justify-center">
        <Faq userType={activeTab} />
      </section>
    </div>
  );
};

export default AboutUsTab;
