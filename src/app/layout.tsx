import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryProvider } from "@/react-query/provider";
import { ReduxProvider } from "@/redux/provider";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

export const metadata: Metadata = {
  title: "Fyndr",
  description:
    "Fyndr is a marketplace platform that offers realtime promotions deals and discounts to help people discover and find experiences in their city. If youre seeking convenience and savings then Fyndr has the right deal for you.",
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
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={`${inter.className} antialiased`}>
          {/* <ReduxProvider> */}
          <ReactQueryProvider>{children}</ReactQueryProvider>
          {/* </ReduxProvider> */}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
