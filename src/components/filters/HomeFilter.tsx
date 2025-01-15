"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

type Props = {
  categories: category[];
};

const HomeFilter = ({ categories }: Props) => {
  const [clickedMore, setClickedMore] = useState<boolean>(false);

  const handleClick = (category: category) => {
    console.log({ category }, "clicked");
  };

  const handleClickMore = () => {
    setClickedMore((prev) => !prev);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {categories.slice(0, 10).map((category) => (
        <Button
          key={category.objid}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            "bg-light-800 text-light-300 hover:bg-light-800"
          )}
          onClick={() => handleClick(category)}
        >
          {category.name}
        </Button>
      ))}
      {clickedMore &&
        categories.slice(10).map((category) => (
          <Button
            key={category.objid}
            className={cn(
              `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
              "bg-light-800 text-light-300 hover:bg-light-800"
            )}
            onClick={() => handleClick(category)}
          >
            {category.name}
          </Button>
        ))}
      <Button
        className={cn(
          `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
          "hover:bg-primary-100 text-primary-500 bg-primary-100"
        )}
        onClick={() => handleClickMore()}
      >
        {clickedMore ? "Less" : "More"}
      </Button>
    </div>
  );
};

export default HomeFilter;
