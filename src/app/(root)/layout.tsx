import React, { ReactNode } from "react";

import Footer from "@/components/navigation/footer";
import Navbar from "@/components/navigation/navbar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col bg-light-800 pt-16">
          <div className="">{children}</div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default RootLayout;
