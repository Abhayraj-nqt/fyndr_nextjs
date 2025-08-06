import {
  BadgePercent,
  CircleUser,
  LogOut,
  Menu,
  TicketPercent,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ROUTES from "@/constants/routes";

import NavLinks from "./nav-links";
import Button from "../../buttons";
import SignOutButton from "../../buttons/sign-out-button";

const MobileNavigationDrawer = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <Drawer>
      <DrawerTrigger>
        <Menu size={30} className="text-white lg:hidden" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Fyndr</DrawerTitle>
          <div>
            <NavLinks
              isMobileNav
              className="heading-7 flex items-center gap-4 rounded-10 p-4 py-2 text-black-80 transition-colors duration-200 hover:bg-white hover:text-black-90"
            />

            <Link
              href={ROUTES.OFFERS_AND_EVENTS}
              key={ROUTES.OFFERS_AND_EVENTS}
              className={
                "heading-7 flex items-center gap-4 rounded-10 p-4 py-2 text-black-80 transition-colors duration-200 hover:bg-white hover:text-black-90"
              }
            >
              <BadgePercent />
              <p>Offers & Events</p>
            </Link>

            {userId ? (
              <>
                <Link
                  href={
                    session.user.entityRole === "BIZ_ADMIN"
                      ? ROUTES.BUSINESS_DASHBOARD
                      : session.user.entityRole === "INDIVIDUAL_ADMIN"
                        ? ROUTES.USER_DASHBOARD
                        : ROUTES.ADMIN_DASHBOARD
                  }
                  key={"Account"}
                  className={
                    "heading-7 flex items-center gap-4 rounded-10 p-4 py-2 text-black-80 transition-colors duration-200 hover:bg-white hover:text-black-90"
                  }
                >
                  <CircleUser />
                  <p>Account</p>
                </Link>
                <Link
                  href={ROUTES.MY_OFFERS}
                  key={"My Offers"}
                  className={
                    "heading-7 flex items-center gap-4 rounded-10 p-4 text-black-80 transition-colors duration-200 hover:bg-white hover:text-black-90"
                  }
                >
                  <TicketPercent />
                  <p>My Offers</p>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col gap-3">
          {userId ? (
            <div className="flex-center">
              <SignOutButton className="min-h-11 w-full min-w-36 self-center !rounded-10 border border-secondary bg-white text-base font-normal text-secondary shadow-none hover:bg-secondary hover:text-white">
                <LogOut className="size-5" />
                <span className="">Logout</span>
              </SignOutButton>
            </div>
          ) : (
            <>
              <DrawerClose asChild>
                <Link href={ROUTES.SIGN_IN}>
                  <Button
                    variant={"primary-dark"}
                    className="w-full"
                    stdHeight
                    stdWidth
                  >
                    <span className="">Log In</span>
                  </Button>
                </Link>
              </DrawerClose>

              <DrawerClose asChild>
                <Link href={ROUTES.SIGN_UP}>
                  <Button
                    variant={"primary-dark-outlined"}
                    className="w-full"
                    stdHeight
                    stdWidth
                  >
                    Register
                  </Button>
                </Link>
              </DrawerClose>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigationDrawer;
