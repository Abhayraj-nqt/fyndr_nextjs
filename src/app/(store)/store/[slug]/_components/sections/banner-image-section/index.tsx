import { Copy } from "lucide-react";
import Image from "next/image";
import React from "react";

import CopyToClipboard from "@/components/global/copy-to-clipboard";
import { cn } from "@/lib/utils";

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
        <CopyToClipboard text="url">
          <div className="rounded-full bg-black/30 p-4 text-white ">
            <Copy size={30} />
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default BannerImageSection;
