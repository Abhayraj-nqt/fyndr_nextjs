import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

import Account from "./Account";
import Logo from "./Logo";
import MobileNavigation from "./mobile-navigation";
import NavLinks from "./nav-links";
import LocationSelector from "../../location-selector";
import MobileLocationSelectorModal from "../../location-selector/mobile-location-selector-modal";
import LocalSearch from "../../search/local-search";
import VisibilityWrapper from "../../visibility-wrapper";

type Props = {
  searchbar?: boolean;
  location?: boolean;
  searchNavigateTo?: string;
  searchParam?: string;
};

const Navbar = ({
  location,
  searchbar,
  searchNavigateTo,
  searchParam = "query",
}: Props) => {
  return (
    <nav className="flex-between sticky top-0 z-50 min-h-16 w-full gap-5 bg-primary-500 p-2 px-4 xs:px-8">
      <Logo />
      <div className="flex-between relative w-full max-w-2xl gap-2 lg:gap-8">
        {searchbar && (
          <>
            {searchNavigateTo ? (
              <VisibilityWrapper visibleHeight={200}>
                <LocalSearch
                  icon="/icons/search.svg"
                  placeholder="Search Offers, Events & Businesses"
                  route="/"
                  className="size-full min-h-9 min-w-[50%] max-w-lg flex-1 xs:min-h-[45px] sm:w-full"
                  inputClassName=""
                  navigateTo={searchNavigateTo}
                  navigateParam={searchParam}
                  isOnNavbar
                />
              </VisibilityWrapper>
            ) : (
              <LocalSearch
                icon="/icons/search.svg"
                placeholder="Search Offers, Events & Businesses"
                route="/"
                className="size-full min-h-9 min-w-[50%] max-w-lg flex-1 xs:min-h-[45px] sm:w-full"
                inputClassName=""
                navigateTo={searchNavigateTo}
                navigateParam={searchParam}
                isOnNavbar
              />
            )}
          </>
        )}
        {location && (
          <>
            <LocationSelector
              className="hidden w-full sm:flex"
              inputClassName="w-full"
            />
            <div></div>
            <MobileLocationSelectorModal />
          </>
        )}
      </div>

      <div className="flex-between gap-5">
        <section className="mx-4 hidden w-full min-w-40 max-w-48 justify-end gap-4 lg:flex">
          <NavLinks className="md:flex-center small-regular hidden flex-col gap-1 text-light-900" />
        </section>
        <Button
          variant={"outline"}
          className={
            "body-medium hidden self-center rounded-lg border-2 border-light-900 bg-transparent px-3 py-4 text-light-900 hover:bg-transparent hover:text-light-900 lg:flex"
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
