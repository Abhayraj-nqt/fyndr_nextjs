import React from "react";

import Navbar from "@/components/global/navigation/navbar";

type Props = {
  children: React.ReactNode;
};

const ListingLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar searchbar location />
      <section className="flex min-h-screen flex-1 flex-col bg-light-800">
        <div>{children}</div>
      </section>
    </div>
  );
};

export default ListingLayout;
