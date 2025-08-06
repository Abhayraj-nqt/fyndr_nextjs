"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { NAVBAR_MENU } from "@/constants/menu";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

interface Props {
  isMobileNav?: boolean;
  className?: string;
}

const NavLinks = ({ isMobileNav = false, className }: Props) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      {NAVBAR_MENU.map(({ label, route, icon: Icon }) => {
        const isActive =
          (pathname.includes(route) && route.length > 1) || pathname === route;

        if (!session?.user && route === ROUTES.WALLET) return null;
        if (
          session?.user?.entityRole === "SUPER_ADMIN" &&
          route === ROUTES.WALLET
        )
          return null;
        if (
          session?.user?.entityRole === "FYNDR_SUPPORT" &&
          route === ROUTES.WALLET
        )
          return null;

        const LinkComponent = (
          <Link
            href={route}
            key={label}
            className={cn(isActive ? "" : "", "", className)}
          >
            {Icon ? (
              typeof Icon === "string" ? (
                <Image
                  src={Icon}
                  height={20}
                  width={20}
                  className="size-4"
                  alt={label}
                />
              ) : (
                <Icon size={20} />
              )
            ) : (
              <></>
            )}
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
};

export default NavLinks;
