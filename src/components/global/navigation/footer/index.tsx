import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { FOOTER_MENU } from "@/constants/menu";

import ContactUsModal from "./ContactUsModal";
import SocialLinks from "./social-links";

const Footer = () => {
  return (
    <main className="flex-between  bg-dark-200 text-light-900 md:items-center  max-h-[100px] py-5 w-full">
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-8"> */}
      <SocialLinks className="hidden sm:flex " />
      {FOOTER_MENU.map(({ icon, url, label }) => (
        <React.Fragment key={label}>
          {label !== "Contact Us" ? (
            <Link href={url} key={label} className="flex  gap-1">
              {typeof icon === "string" ? (
                <Image src={icon} width={20} height={20} alt={label} />
              ) : (
                React.createElement(icon, {
                  className: "w-5 h-5 text-light-700 hidden lg:flex",
                })
              )}
              <div className="text-[20px] sm:body-regular text-light-700 xs: ml-2 sm:ml-2 md:ml-2">
                {label}
              </div>
            </Link>
          ) : (
            <>
              <ContactUsModal>
                <div className="flex  gap-1">
                  {typeof icon === "string" ? (
                    <Image src={icon} width={20} height={20} alt={label} />
                  ) : (
                    React.createElement(icon, {
                      className: "w-5 h-5 text-light-700 hidden lg:flex",
                    })
                  )}
                  <div className="small-regular sm:body-regular text-light-700 xs: ml-2 sm:ml-2 md:ml-2">
                    {label}
                  </div>
                </div>
              </ContactUsModal>
            </>
          )}

          <Separator orientation="vertical" className="h-8" />
        </React.Fragment>
      ))}
      {/* </div> */}
    </main>
  );
};

export default Footer;
