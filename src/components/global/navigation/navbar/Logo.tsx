import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";

const Logo = () => {
  return (
    <Link href={ROUTES.HOME} className="flex items-center gap-1">
      <Image
        src={"/images/site-logo.png"}
        width={100}
        height={100}
        alt="Fyndr Logo"
        className="hidden w-28 min-w-28 max-w-28 md:flex"
      />
      <Image
        src={"/images/site-logo-small.svg"}
        width={23}
        height={23}
        alt="Fyndr Logo"
        className="flex w-6 min-w-6 md:hidden"
      />
    </Link>
  );
};

export default Logo;
