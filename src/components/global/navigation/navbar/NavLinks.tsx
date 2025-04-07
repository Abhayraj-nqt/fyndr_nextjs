"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { NAVBAR_MENU } from "@/constants/menu";
import { cn } from "@/lib/utils";

interface Props {
  isMobileNav?: boolean;
  userId?: string;
  className?: string;
}

const NavLinks = ({ isMobileNav = false, userId, className }: Props) => {
  const pathname = usePathname();

  return (
    <>
      {NAVBAR_MENU.map(({ label, route, icon: Icon, imgURL }) => {
        const isActive =
          (pathname.includes(route) && route.length > 1) || pathname === route;

        if (route === "/account") {
          if (userId) route = `${route}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            href={route}
            key={label}
            className={cn(isActive ? "" : "", "", className)}
          >
            {/* <Image
              src={item.imgURL!}
              alt={item.label}
              width={20}
              height={20}
              className={cn("")}
            /> */}
            {Icon && <Icon size={20} />}
            <p className={cn(isActive ? "" : "")}>{label}</p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );

  // return (
  //   <div className="small-regular flex gap-10 text-light-900">
  //     {NAVBAR_MENU.map((navLink) => (
  //       <Link
  //         key={navLink.label}
  //         href={navLink.route}
  //         className="flex-center cursor-pointer flex-col gap-1"
  //       >
  //         <Image
  //           src={navLink.imgURL}
  //           alt={navLink.label}
  //           height={20}
  //           width={20}
  //         />
  //         <p>{navLink.label}</p>
  //       </Link>
  //     ))}
  //   </div>
  // );
};

export default NavLinks;
