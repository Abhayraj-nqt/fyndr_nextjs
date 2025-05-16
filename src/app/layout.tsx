import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { Toaster } from "@/components/global/toast";
import UserProvider from "@/provider/user-provider";
import { ReactQueryProvider } from "@/react-query/provider";

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
    <html lang="en" suppressHydrationWarning className="no-scrollbar">
      <body className={`${inter.className} no-scrollbar antialiased`}>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <UserProvider>{children}</UserProvider>
          </ReactQueryProvider>
          <Toaster position="top-center" closeButton={false} duration={3000} />
        </SessionProvider>
      </body>
    </html>
  );
}
