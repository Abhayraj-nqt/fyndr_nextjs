import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { COMPANY } from "@/constants";
import { FOOTER_MENU } from "@/constants/menu";

import SocialLinks from "./social-links";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <main className="flex flex-col bg-dark-200 text-light-900 md:items-center">
      <div className="flex-between w-full px-4 py-8 sm:w-11/12">
        <div className="hidden flex-col gap-4 self-start sm:flex">
          <Image
            src={"/images/site-logo.png"}
            width={100}
            height={100}
            alt="Fyndr Logo"
          />
          <p className="body-regular text-light-700">An online marketplace</p>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {FOOTER_MENU.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-2">
              <h2 className="body-medium mb-2 text-light-400">{title}</h2>
              {links.map(({ label, url }) => (
                <Link
                  key={label}
                  href={url}
                  className="small-regular sm:body-regular text-light-700"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-2 px-4 sm:hidden">
        <h2 className="body-medium mb-2 text-light-400">Social</h2>
        <SocialLinks />
      </div>
      <Separator className="bg-dark-300" />
      <div className="flex-between w-full px-4 py-6 xs:w-11/12">
        <p className="body-regular text-light-700">
          © {currentYear} {COMPANY.name}. All rights reserved.
        </p>
        <SocialLinks className="hidden sm:flex" />
      </div>
    </main>
  );
};

export default Footer;
