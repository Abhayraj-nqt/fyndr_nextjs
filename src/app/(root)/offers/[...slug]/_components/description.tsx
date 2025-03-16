import React from "react";

import DefaultCard from "@/components/global/cards/DefaultCard";
import HtmlContent from "@/components/global/html-content";

type Props = {
  desc: string;
};

const Description = ({ desc }: Props) => {
  return (
    <DefaultCard className="w-full p-6">
      <h2 className="mb-2 text-xl font-medium text-primary-900">Details</h2>
      <HtmlContent htmlString={desc} />
    </DefaultCard>
  );
};

export default Description;
