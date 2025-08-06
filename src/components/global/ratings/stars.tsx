import React from "react";

import Star from "@/components/icons/star";

type Props = {
  outOf?: number;
  ratings: number;
};

const Stars = ({ ratings = 0, outOf = 5 }: Props) => {
  if (ratings > outOf) ratings = outOf;

  const remaining = outOf - ratings;

  return (
    <div className="flex">
      {Array.from({ length: ratings }, (_, index) => (
        <Star key={index} varient="filled" />
      ))}
      {Array.from({ length: remaining }, (_, index) => (
        <Star key={index} varient="empty" />
      ))}
    </div>
  );
};

export default Stars;
