import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { FOOTER_MENU } from "@/constants/menu";

import ContactUsModal from "./ContactUsModal";
import SocialLinks from "./social-links";

const Footer = () => {
  return (
    <footer className="w-full  bg-black-100  px-4 py-6">
      <div className="flex flex-col items-center gap-4  md:flex-row  md:justify-center ">
        <SocialLinks />

        <div className="flex gap-4 xs:flex-wrap  md:flex-nowrap md:gap-4 lg:ml-2 lg:justify-around lg:gap-2 xl:ml-10 xl:gap-10 2xl:gap-14">
          {FOOTER_MENU.map(({ icon, url, label }, index) => (
            <React.Fragment key={label}>
              {label !== "Contact Us" ? (
                <Link href={url} className="flex items-center gap-2">
                  {typeof icon === "string" ? (
                    <Image src={icon} width={20} height={20} alt={label} />
                  ) : (
                    React.createElement(icon, {
                      className: "w-5 h-5 text-secondary-20 hidden lg:flex",
                    })
                  )}
                  <span className="text-sm text-secondary-20 sm:text-base md:text-[0.8rem] lg:text-base ">
                    {label}
                  </span>
                </Link>
              ) : (
                <ContactUsModal>
                  <div className="flex cursor-pointer items-center gap-1">
                    {typeof icon === "string" ? (
                      <Image src={icon} width={20} height={20} alt={label} />
                    ) : (
                      React.createElement(icon, {
                        className: "w-5 h-5 text-secondary-20 hidden lg:flex",
                      })
                    )}
                    <span className="text-sm text-secondary-20 sm:text-base md:text-[0.8rem] lg:text-base ">
                      {label}
                    </span>
                  </div>
                </ContactUsModal>
              )}

              {index < FOOTER_MENU.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="hidden h-6 sm:block"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
