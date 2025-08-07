import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import HtmlContent from "@/components/global/html-content";

type Props = {
  terms: string;
};

const TermsAndConditionsSection = ({ terms }: Props) => {
  if (!terms) return null;

  return (
    <DefaultCard className="w-full p-4 sm:p-6">
      <h2 className="heading-7-medium mb-2 text-secondary">
        Terms & Conditions
      </h2>
      <HtmlContent htmlString={terms} className="body-3 text-black-90" />
    </DefaultCard>
  );
};

export default TermsAndConditionsSection;
