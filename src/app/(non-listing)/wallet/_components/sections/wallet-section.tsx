import React from "react";

import WaletBalance from "../wallet-balance";
import WalletDescription from "../wallet-description";

const WalletSection = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:grid md:grid-cols-5">
      <WaletBalance className="md:col-span-3" />
      <WalletDescription className="mt-4 md:col-span-2 md:mt-0" />
    </div>
  );
};

export default WalletSection;
