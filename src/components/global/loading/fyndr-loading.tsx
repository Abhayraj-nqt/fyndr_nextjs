import Image from "next/image";
import React from "react";

import ASSETS from "@/constants/assets";

type Props = {
  loading?: boolean;
  message?: React.ReactNode;
};

const FyndrLoading = ({ loading = true, message = null }: Props) => {
  return loading ? (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-[#0000004d]">
      <div className="flex flex-col gap-1">
        <Image
          src={ASSETS.GIFS.LOADING}
          alt="Loading..."
          height={50}
          width={50}
          className="size-14 rounded-full"
        />
        {message}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default FyndrLoading;
