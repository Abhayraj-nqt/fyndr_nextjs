import React from "react";

import Footer from "@/components/global/navigation/footer";
import Navbar from "@/components/global/navigation/navbar";
import ROUTES from "@/constants/routes";

type Props = {
  children: React.ReactNode;
};

const LandingPageLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar searchbar location searchNavigateTo={ROUTES.OFFER_LISTING} />
      <section className="flex min-h-screen flex-1 flex-col bg-secondary-10">
        <div>{children}</div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
