import React from "react";

type Props = {
  filters: React.ReactNode;
  mobileFilters: React.ReactNode;
  children: React.ReactNode;
  actionBar?: React.ReactNode;
  heading: string;
};

const ListingContainer = ({
  children,
  filters,
  heading,
  mobileFilters,
  actionBar,
}: Props) => {
  return (
    <main className="flex-center relative flex-1 p-4">
      <div className="relative flex max-w-[1550px] flex-1 flex-col flex-nowrap gap-4">
        {actionBar}
        <div className="relative flex flex-1 flex-col flex-nowrap gap-4 md:flex-row">
          <section className="hidden h-fit w-80 min-w-80 rounded-10 bg-white md:flex">
            {filters}
          </section>
          <section className="z-20 flex md:hidden">{mobileFilters}</section>
          <section className="w-full rounded-10 bg-white p-4">
            <h1 className="title-7-medium mb-4 text-black-heading">
              {heading}
            </h1>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ListingContainer;
