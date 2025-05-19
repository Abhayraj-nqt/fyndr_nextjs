import React from "react";

import { ABOUT_PAGE_FEATURES, FYNDR_ABOUT_AND_MISSION } from "@/constants";

import AboutRow from "./_components/aboutrow";
import AboutUsTab from "./_components/aboutustab";
import FeatureCard from "./_components/featurecards";

const AboutUs = () => {
  return (
    <main>
      <div className="group relative flex flex-col items-center justify-center gap-4 p-4 md:flex-row">
        {ABOUT_PAGE_FEATURES.map((feature,index) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            imgURL={feature.imgURL}
            description={feature.description}
            index={index}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-8 bg-light-800 p-4 py-10">
        {FYNDR_ABOUT_AND_MISSION.map((item) => (
          <AboutRow
            key={item.title}
            imgURL={item.imgURL}
            title={item.title}
            content={item.content}
            imgDir={item.imgDir}
          />
        ))}
      </div>
      <div className="bg-light-900 pt-5 ">
        <h1 className="text-center text-[1.5rem] font-semibold  leading-[42px]">
          How to use Fyndr:
        </h1>
        <AboutUsTab />
      </div>
    </main>
  );
};

export default AboutUs;
