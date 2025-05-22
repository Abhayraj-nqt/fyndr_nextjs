import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { FOOTER_MENU } from "@/constants/menu";

import SocialLinks from "./social-links";

const Footer = () => {
  return (
    <main className="flex-between  bg-dark-200 text-light-900 md:items-center border border-red-600 max-h-[100px] py-5 w-full">
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-8"> */}
      <SocialLinks className="hidden sm:flex " />
      {FOOTER_MENU.map(({ icon, url, label }) => (
        <React.Fragment key={label}>
          <Link href={url} key={label} className="flex  gap-1">
            {typeof icon === "string" ? (
              <Image src={icon} width={20} height={20} alt={label} />
            ) : (
              React.createElement(icon, {
                className: "w-5 h-5 text-light-700",
              })
            )}
            <div className="small-regular sm:body-regular text-light-700">
              {label}
            </div>
          </Link>

          <Separator orientation="vertical" className="h-8" />
        </React.Fragment>
      ))}
      {/* </div> */}
    </main>
  );
};

export default Footer;
