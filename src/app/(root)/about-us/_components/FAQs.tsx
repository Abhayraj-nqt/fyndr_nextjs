import React from "react";

import DefaultCard from "@/components/cards/DefaultCard";
import LocalSearch from "@/components/search/LocalSearch";

const FAQs = () => {
  return (
    <DefaultCard>
      <h1>Frequently Asked Questions By Individuals (FAQs)</h1>
      <p>Have question? We’re here to help you.</p>
      <LocalSearch
        imgSrc="/icons/search.svg"
        placeholder="Type your question here..."
        route="/about-us"
      />
    </DefaultCard>
  );
};

export default FAQs;
