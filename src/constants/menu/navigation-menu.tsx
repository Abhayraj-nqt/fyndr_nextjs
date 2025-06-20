import {
  Store,
  Wallet,
  Users,
  ArrowDownToLine,
  Contact,
  ReceiptText,
  GlobeLock,
  Handshake,
  TableOfContents,
  LucideIcon,
} from "lucide-react";
import { StaticImageData } from "next/image";

import ROUTES from "../routes";

import { MenuProps } from ".";

export interface FooterMenuProps {
  icon: string | LucideIcon | StaticImageData;
  label: string;
  url: string;
}

export const NAVBAR_MENU: MenuProps[] = [
  {
    imgURL: "/icons/home.svg",
    route: ROUTES.HOME,
    label: "Home",
    icon: Store,
  },
  {
    imgURL: "/icons/wallet.svg",
    route: ROUTES.WALLET,
    label: "Wallet",
    icon: Wallet,
  },
  {
    imgURL: "/icons/users.svg",
    route: ROUTES.ABOUT_US,
    label: "About Us",
    icon: Users,
  },
];

export const FOOTER_MENU: FooterMenuProps[] = [
  {
    icon: ArrowDownToLine,
    label: "Download Fyndr",
    url: ROUTES.DOWNLOAD_FYNDR,
  },
  {
    icon: Contact,
    label: "Contact Us",
    url: "",
  },
  {
    icon: ReceiptText,
    label: "Term of use",
    url: ROUTES.LEGAL_TERMS,
  },
  {
    icon: GlobeLock,
    label: "Privacy Policy",
    url: ROUTES.LEGAL_PRIVACY,
  },
  {
    icon: Handshake,
    label: "Business Agremnent",
    url: ROUTES.LEGAL_AGREEMENT,
  },
  {
    icon: TableOfContents,
    label: "FAQ",
    url: `${ROUTES.ABOUT_US}#faq`,
  },
];
