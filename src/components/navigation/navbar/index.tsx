import Link from "next/link";
import React from "react";

import Location from "@/components/Location";
import GlobalSearch from "@/components/search/GlobalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

import Account from "./Account";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import NavLinks from "./NavLinks";

const Navbar = async () => {
  return (
    <nav className="flex-between fixed z-50 min-h-16 w-full gap-5 bg-primary-500 px-8 py-2">
      <Logo />
      <GlobalSearch
        imgSrc="/icons/search.svg"
        placeholder="Search Offers, Events & Businesses"
        route="/"
        otherClasses="flex-1 w-11/12 sm:w-full max-w-lg h-full min-h-[45px]"
      />
      <Location />
      <NavLinks className="md:flex-center small-regular hidden flex-col gap-1 text-light-900" />
      <Button
        variant={"outline"}
        className="body-medium self-center rounded-lg border-2 border-light-900 bg-transparent px-6 py-3 text-light-900 hover:bg-transparent hover:text-light-900"
        asChild
      >
        <Link href={ROUTES.OFFERS}>Offers & Events</Link>
      </Button>
      <div className="flex-between gap-5">
        <Account className="hidden md:flex" />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
