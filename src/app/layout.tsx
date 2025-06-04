import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { auth } from "@/auth";
import { Toaster } from "@/components/global/toast";
import { ReactQueryProvider } from "@/provider/react-query-provider";
import UserProvider from "@/provider/user-provider";

// const inter = localFont({
//   src: "./fonts/InterVF.ttf",
//   variable: "--font-inter",
//   weight: "100 200 300 400 500 700 800 900",
// });

const roboto = localFont({
  src: "./fonts/roboto.ttf",
  variable: "--font-roboto",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Fyndr: Your Marketplace for Local Deals, Services, and Events",
  description:
    "Fyndr is a marketplace platform, offering real-time promotions, deals, and discounts to help you discover and enjoy the best experiences in your city. Get amazing deals on Fyndr today!",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning className="no-scrollbar">
      {/* <body className={`${inter.className} no-scrollbar antialiased`}> */}
      <body className={`${roboto.className} no-scrollbar antialiased`}>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <UserProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </UserProvider>
          </ReactQueryProvider>
          <Toaster position="top-center" closeButton={false} duration={3000} />
        </SessionProvider>
      </body>
    </html>
  );
}
