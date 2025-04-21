import Link from "next/link";
import React from "react";

import Location from "@/components/global/Location";
import GlobalSearch from "@/components/global/search/GlobalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

import Account from "./Account";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import NavLinks from "./NavLinks";

type Props = {
  searchbar?: boolean;
  location?: boolean;
};

const Navbar = async ({ location, searchbar }: Props) => {
  return (
    <nav className="flex-between sticky top-0 z-50 min-h-16 w-full gap-5 bg-primary-500 px-8 py-2">
      <Logo />
      {searchbar && (
        <GlobalSearch
          imgSrc="/icons/search.svg"
          placeholder="Search Offers, Events & Businesses"
          route="/"
          otherClasses="flex-1 w-11/12 sm:w-full max-w-lg h-full min-h-[45px]"
        />
      )}
      {location && <Location />}

      <div className="flex-between gap-5">
        <section className="mr-8 hidden w-full max-w-48 justify-between gap-8 md:flex">
          <NavLinks className="md:flex-center small-regular hidden flex-col gap-1 text-light-900" />
        </section>
        <Button
          variant={"outline"}
          className={
            "body-medium hidden self-center rounded-lg border-2 border-light-900 bg-transparent px-3 py-4 text-light-900 hover:bg-transparent hover:text-light-900 md:flex"
          }
        >
          <Link href={ROUTES.OFFERS_AND_EVENTS}>Offers & Events</Link>
        </Button>
        <Account className="hidden md:flex" />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
