import Image from "next/image";
import Link from "next/link";
import React from "react";

import ASSETS from "@/constants/assets";
import ROUTES from "@/constants/routes";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <div className={`lg:w-[19rem] ${className}`}>
      <Link
        href={ROUTES.HOME}
        className={`flex w-fit max-w-fit items-center gap-1`}
      >
        <Image
          src={ASSETS.IMAGES.LOGO.WHITE}
          width={100}
          height={100}
          alt="Fyndr Logo"
          className="hidden w-28 min-w-28 max-w-28 md:flex"
        />
        <Image
          src={ASSETS.IMAGES.LOGO.WHITE_SMALL}
          width={23}
          height={23}
          alt="Fyndr Logo"
          className="flex w-6 min-w-6 md:hidden"
        />
      </Link>
    </div>
  );
};

export default Logo;
