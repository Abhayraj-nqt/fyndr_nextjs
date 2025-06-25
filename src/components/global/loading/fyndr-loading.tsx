import Image from "next/image";
import React from "react";

import ASSETS from "@/constants/assets";

type Props = {
  loading?: boolean;
};

const FyndrLoading = ({ loading = true }: Props) => {
  return loading ? (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-[#0000004d]">
      <Image
        src={ASSETS.GIFS.LOADING}
        alt="Loading..."
        height={50}
        width={50}
        className="size-14 rounded-full"
      />
    </div>
  ) : (
    <></>
  );
};

export default FyndrLoading;
