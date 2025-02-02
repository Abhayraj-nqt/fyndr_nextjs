import React from "react";

import DefaultCard from "@/components/global/cards/DefaultCard";

const Offer = () => {
  return (
    <main>
      <div className="grid grid-cols-2">
        <DefaultCard className="p-0">side-bar</DefaultCard>

        <div className="flex flex-col gap-4">
          <DefaultCard>offers/coupons/</DefaultCard>
          <DefaultCard>
            <h2>Terms & Conditions</h2>
            <p>Testingg hello</p>
          </DefaultCard>
          <DefaultCard>
            <h2>Details</h2>
            <p>
              is a long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout. The point
              of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
            </p>
          </DefaultCard>
          <DefaultCard>Map</DefaultCard>
        </div>
      </div>
    </main>
  );
};

export default Offer;
