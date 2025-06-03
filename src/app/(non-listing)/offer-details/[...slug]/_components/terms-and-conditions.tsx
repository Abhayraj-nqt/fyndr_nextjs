import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import HtmlContent from "@/components/global/html-content";

type Props = {
  terms: string;
};

const TermsAndConditions = ({ terms }: Props) => {
  return (
    <DefaultCard className="w-full p-6">
      <h2 className="mb-2 text-xl font-medium text-secondary">
        Terms & Conditions
      </h2>
      <HtmlContent htmlString={terms} />
    </DefaultCard>
  );
};

export default TermsAndConditions;
