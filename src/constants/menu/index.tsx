import { LucideIcon } from "lucide-react";
export { ADMIN_MENU } from "./admin-menu";
export { BUSINESS_MENU } from "./business-menu";
export {
  NAVBAR_MENU,
  FOOTER_MENU,
  type FooterMenuProps,
} from "./navigation-menu";

export interface MenuProps {
  imgURL?: string;
  icon?: LucideIcon | "string";
  route: string;
  label: string;
}

export interface SubMenuProps extends MenuProps {
  subMenu?: MenuProps[];
  hasSubMenu?: boolean;
}
