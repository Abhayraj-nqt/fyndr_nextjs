import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import HtmlContent from "@/components/global/html-content";

type Props = {
  desc: string;
};

const DescriptionSection = ({ desc }: Props) => {
  if (!desc) return null;

  return (
    <DefaultCard className="w-full p-6">
      <h2 className="heading-7-medium mb-2 text-secondary">Details</h2>
      <HtmlContent htmlString={desc} className="body-3 text-black-90" />
    </DefaultCard>
  );
};

export default DescriptionSection;
