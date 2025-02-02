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
      {NAVBAR_MENU.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === "/account") {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(isActive ? "" : "", "", className)}
          >
            <Image
              src={item.imgURL!}
              alt={item.label}
              width={20}
              height={20}
              className={cn("")}
            />
            <p
              className={cn(
                isActive ? "" : "",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.route}>
            {item.label !== "Offers & Events" ? (
              LinkComponent
            ) : (
              <Button
                variant={"outline"}
                className={cn(
                  isActive ? "" : "",
                  "",
                  className,
                  "body-medium self-center rounded-lg border-2 border-light-900 bg-transparent px-3 py-4 text-light-900 hover:bg-transparent hover:text-light-900"
                )}
                asChild
              >
                <Link href={item.route}>{item.label}</Link>
              </Button>
            )}
          </React.Fragment>
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
