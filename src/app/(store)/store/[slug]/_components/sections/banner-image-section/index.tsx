import { Copy } from "lucide-react";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

import CopyUrl from "../../copy-url";

type Props = {
  imgURL: string;
  alt: string;
  className?: string;
};

const BannerImageSection = ({ imgURL, alt, className }: Props) => {
  return (
    <div className={cn(`relative`, className)}>
      <Image
        src={imgURL}
        alt={alt}
        height={500}
        width={500}
        className="w-full rounded-10"
      />
      <div className="absolute right-4 top-4">
        <CopyUrl>
          <div className="rounded-full bg-black/30 p-2 text-white md:p-4 ">
            <Copy className="size-4 md:!size-7" />
          </div>
        </CopyUrl>
      </div>
    </div>
  );
};

export default BannerImageSection;
