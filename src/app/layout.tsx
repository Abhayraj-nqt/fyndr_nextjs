import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { LocationProvider } from "@/context/LocationContext";
import { LocationService } from "@/lib/location-service";

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
  const initialLocation = await LocationService.getLocation();

  // If user is logged in, use their saved location.
  const userLocation = session?.user?.location;

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <LocationProvider
          initialLocation={initialLocation}
          userLocation={userLocation}
        >
          <body className={`${inter.className} antialiased`}>
            {children}
            <Toaster />
          </body>
        </LocationProvider>
      </SessionProvider>
    </html>
  );
}
