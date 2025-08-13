import React from "react";

const HeadingSection = () => {
  return (
    <div className="flex w-full flex-col">
      <h1 className="heading-5-medium border-b border-secondary-20 p-4">
        Order at {"Business name"}
      </h1>
      <div className="flex-between p-4">
        <div className="heading-6-medium w-full p-4 text-center">
          Overview Order
        </div>
        <div className="h-4 w-[41px]"></div>
      </div>
    </div>
  );
};

export default HeadingSection;
