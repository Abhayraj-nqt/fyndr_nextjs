import {
  Logs,
  Users,
  UserCog,
  BookMarked,
  Gift,
  Megaphone,
  CircleDollarSign,
  Gavel,
  ChartColumnStacked,
  MessageSquareWarning,
} from "lucide-react";

import { SubMenuProps } from ".";

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
