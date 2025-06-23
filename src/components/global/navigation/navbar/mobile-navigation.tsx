import {
  LogOut,
  Menu,
  CircleUser,
  TicketPercent,
  BadgePercent,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import Button from "@/components/global/buttons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ASSETS from "@/constants/assets";
import ROUTES from "@/constants/routes";

import NavLinks from "./nav-links";
import SignOutButton from "../../buttons/sign-out-button";

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Menu size={30} className="text-white lg:hidden" />
      </SheetTrigger>
      <SheetContent side={"right"} className="border-none bg-white">
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex w-fit items-center gap-1">
          <Image
            src={ASSETS.IMAGES.LOGO.PRIMARY}
            width={200}
            height={100}
            alt="Logo"
            className="w-32"
          />
        </Link>
        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-8 pt-16">
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
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            {userId ? (
              <div className="flex-center">
                <SignOutButton className="min-h-11 w-full min-w-36 self-center !rounded-10 border border-secondary bg-white text-base font-normal text-secondary shadow-none hover:bg-secondary hover:text-white">
                  <LogOut className="size-5" />
                  <span className="">Logout</span>
                </SignOutButton>
              </div>
            ) : (
              <>
                <SheetClose asChild>
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
                </SheetClose>

                <SheetClose asChild>
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
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
