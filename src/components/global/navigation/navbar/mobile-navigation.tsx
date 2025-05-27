import { LogOut, Menu } from "lucide-react";
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
import ROUTES from "@/constants/routes";

import NavLinks from "./nav-links";
import SignOutButton from "../../buttons/sign-out-button";
import { CircleUser, TicketPercent } from "lucide-react";

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={30} className="text-light-900 lg:hidden" />
      </SheetTrigger>
      <SheetContent side={"right"} className="border-none bg-primary-900">
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/site-logo.png"
            width={100}
            height={100}
            alt="Logo"
          />
        </Link>
        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-10 pt-16">
              <NavLinks
                isMobileNav
                className="flex items-center gap-4 text-white p-4 text-xl rounded-[10px] hover:bg-white hover:text-primary-900 duration-200 transition-colors"
              />

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
                      "flex items-center gap-4 text-white p-4 text-xl rounded-[10px] hover:bg-white hover:text-primary-900 duration-200 transition-colors"
                    }
                  >
                    <CircleUser />
                    <p>Account</p>
                  </Link>
                  <Link
                    href={ROUTES.MY_OFFERS}
                    key={"My Offers"}
                    className={
                      "flex items-center gap-4 text-white p-4 text-xl rounded-[10px] hover:bg-white hover:text-primary-900 duration-200 transition-colors"
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
                <SignOutButton className="bg-white text-primary-900 font-normal text-base self-center shadow-none rounded-[10px] min-h-11 min-w-36 w-full">
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
                      className="bg-white text-primary-900 w-full hover:bg-white hover:text-primary-900"
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
                      variant={"primary-dark"}
                      className="bg-white text-primary-900 w-full hover:bg-white hover:text-primary-900"
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
