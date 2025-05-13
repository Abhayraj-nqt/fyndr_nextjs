import Link from "next/link";
import React from "react";

import LocationSelector from "@/components/global/location-selector";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

import Account from "./Account";
import Logo from "./Logo";
import MobileNavigation from "./mobile-navigation";
import NavLinks from "./nav-links";
import LocalSearch from "../../search/local-search";

type Props = {
  searchbar?: boolean;
  location?: boolean;
  searchNavigateTo?: string;
  searchParam?: string;
};

const Navbar = async ({
  location,
  searchbar,
  searchNavigateTo,
  searchParam = "query",
}: Props) => {
  return (
    <nav className="flex-between sticky top-0 z-50 min-h-16 w-full gap-5 bg-primary-500 px-8 py-2">
      <Logo />
      {searchbar && (
        <LocalSearch
          icon="/icons/search.svg"
          placeholder="Search Offers, Events & Businesses"
          route="/"
          className="h-full w-11/12 max-w-lg flex-1 sm:w-full"
          navigateTo={searchNavigateTo}
          navigateParam={searchParam}
        />
      )}
      {location && <LocationSelector />}

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
