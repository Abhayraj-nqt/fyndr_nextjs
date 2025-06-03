import React from "react";

import Footer from "@/components/global/navigation/footer";
import Navbar from "@/components/global/navigation/navbar";

type Props = {
  children: React.ReactNode;
};

const ListingLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar searchbar location /> */}
      <Navbar searchbar />
      <section className="flex min-h-screen flex-1 flex-col bg-secondary-10">
        <div>{children}</div>
      </section>
      <Footer />
    </div>
  );
};

export default ListingLayout;
