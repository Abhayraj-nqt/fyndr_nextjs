import Image from "next/image";
import React from "react";

import { HOW_DOES_WALLET_WORK } from "@/constants/wallet";

type Props = {
  className?: string;
};

const WalletDescription = ({ className }: Props) => {
  return (
    <div className={`${className}`}>
      <h2 className="base-medium mb-4">How does it work?</h2>
      <div className="flex flex-col gap-2">
        {HOW_DOES_WALLET_WORK.map(({ id, title, icon: Icon }) => (
          <React.Fragment key={id}>
            <div className="flex items-start gap-8">
              {Icon && (
                <div className="text-secondary">
                  <Icon size={22} />
                </div>
              )}
              <p>{title}</p>
            </div>
            {HOW_DOES_WALLET_WORK.length > id && (
              <Image
                src={"/icons/dots-vertical.svg"}
                alt="dots-vertical"
                width={22}
                height={22}
                className=""
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WalletDescription;
