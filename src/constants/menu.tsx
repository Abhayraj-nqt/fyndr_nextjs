import {
  ShoppingCart,
  Gavel,
  ReceiptText,
  MessageSquareWarning,
  LockKeyhole,
  Building2,
  Landmark,
  Store,
  CircleDollarSign,
  ChartPie,
  QrCode,
  UserCheck,
  Users,
  UserPen,
  CircleUser,
  Logs,
  ChartColumnStacked,
  Blocks,
  PackagePlus,
  CreditCard,
  Shapes,
  IdCard,
  LucideIcon,
  BookCheck,
  ArchiveRestore,
  Wallet,
  BadgePlus,
  BookMarked,
  Megaphone,
  Gift,
  UserCog,
} from "lucide-react";

import ROUTES from "./routes";

export interface MenuProps {
  imgURL?: string;
  icon?: LucideIcon;
  route: string;
  label: string;
}
export interface SubMenuProps extends MenuProps {
  subMenu?: MenuProps[];
  hasSubMenu?: boolean;
}

export interface FooterMenuProps {
  title: string;
  links: {
    label: string;
    url: string;
  }[];
}

export const INDIVIDUAL_MENU: MenuProps[] = [];

export const BUSINESS_MENU: SubMenuProps[] = [
  {
    icon: Logs,
    route: "",
    label: "My Orders",
    hasSubMenu: false,
  },
  {
    icon: ShoppingCart,
    route: "",
    label: "Campaigns",
    hasSubMenu: true,
    subMenu: [
      {
        icon: BadgePlus,
        route: "",
        label: "Create Campaign",
      },
      {
        icon: Shapes,
        route: "",
        label: "Campaigns",
      },
    ],
  },
  {
    icon: Users,
    route: "",
    label: "Interactions",
    hasSubMenu: false,
  },
  {
    icon: CircleDollarSign,
    route: "",
    label: "Payments",
    hasSubMenu: true,
    subMenu: [
      {
        icon: Wallet,
        route: "",
        label: "Collect Payment",
      },
      {
        icon: CreditCard,
        route: "",
        label: "Payment Methods",
      },
    ],
  },
  {
    icon: Store,
    route: "",
    label: "Stores",
    hasSubMenu: true,
    subMenu: [
      {
        icon: ArchiveRestore,
        route: "",
        label: "Create Store",
      },
      {
        icon: Shapes,
        route: "",
        label: "Categories",
      },
      {
        icon: Blocks,
        route: "",
        label: "Items",
      },
      {
        icon: PackagePlus,
        route: "",
        label: "Modifiers",
      },
    ],
  },
  {
    icon: Building2,
    route: "",
    label: "Business",
    hasSubMenu: true,
    subMenu: [
      {
        icon: ReceiptText,
        route: "",
        label: "Business Terms",
      },
      {
        icon: IdCard,
        route: "",
        label: "Business Logo",
      },
      {
        icon: QrCode,
        route: "",
        label: "QR Logo",
      },
      {
        icon: Landmark,
        route: "",
        label: "Locations",
      },
      {
        icon: ChartPie,
        route: "",
        label: "Offer Summary",
      },
      {
        icon: UserCheck,
        route: "",
        label: "My Appointments",
      },
    ],
  },
  {
    icon: CircleUser,
    route: "",
    label: "Profile",
    hasSubMenu: true,
    subMenu: [
      {
        icon: UserPen,
        route: "",
        label: "Update Profile",
      },
      {
        icon: LockKeyhole,
        route: "",
        label: "Change Password",
      },
    ],
  },
  {
    icon: MessageSquareWarning,
    route: "",
    label: "Reports",
    hasSubMenu: true,
    subMenu: [
      {
        icon: BookCheck,
        route: "",
        label: "Terms Accepted",
      },
    ],
  },
  {
    icon: Gavel,
    route: "",
    label: "Dispute",
    hasSubMenu: false,
  },
];

export const ADMIN_MENU: SubMenuProps[] = [
  {
    icon: Logs,
    route: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    icon: Users,
    route: "/admin/user-details",
    label: "User Details",
  },
  {
    icon: UserCog,
    route: "/admin/user-management",
    label: "User Management",
  },
  {
    icon: BookMarked,
    route: "/admin/registration-records",
    label: "Registration Records",
  },
  {
    icon: Gift,
    route: "/admin/promo-codes",
    label: "Promo Codes",
  },
  {
    icon: Megaphone,
    route: "/admin/dashboard/campaigns",
    label: "Campaign",
  },
  {
    icon: CircleDollarSign,
    route: "/admin/dashboard/revenue",
    label: "Revenue",
  },
  {
    icon: Gavel,
    route: "/admin/dispute",
    label: "Dispute",
  },
  {
    icon: ChartColumnStacked,
    route: "/admin/platform-variables",
    label: "Platform variables",
  },
  {
    icon: MessageSquareWarning,
    route: "/admin/reviews-reports",
    label: "Reviews Reports",
  },
];

export const NAVBAR_MENU: MenuProps[] = [
  {
    imgURL: "/icons/home.svg",
    route: ROUTES.HOME,
    label: "Home",
  },
  {
    imgURL: "/icons/wallet.svg",
    route: ROUTES.WALLET,
    label: "Wallet",
  },
  {
    imgURL: "/icons/users.svg",
    route: ROUTES.ABOUT_US,
    label: "About Us",
  },
  {
    imgURL: "/icons/users.svg",
    route: ROUTES.OFFERS,
    label: "Offers & Events",
  },
];

export const FOOTER_MENU: FooterMenuProps[] = [
  {
    title: "Quick Links",
    links: [
      {
        label: "Download Fyndr",
        url: "",
      },
      {
        label: "Blog",
        url: "",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About Us",
        url: "",
      },
      {
        label: "Contact Us",
        url: "",
      },
    ],
  },
  {
    title: "Help",
    links: [
      {
        label: "Payments",
        url: "",
      },
      {
        label: "FAQ",
        url: "",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Terms of Use",
        url: "",
      },
      {
        label: "Privacy Policy",
        url: "",
      },
      {
        label: "Business Agreement",
        url: "",
      },
    ],
  },
];
