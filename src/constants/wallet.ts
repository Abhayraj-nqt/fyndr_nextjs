import { Crown, LucideIcon, Navigation, Wallet } from "lucide-react";

interface FyndrWalletStepsProps {
  id: number;
  imgURL?: string;
  alt?: string;
  title: string;
  icon?: LucideIcon;
}

export const HOW_DOES_WALLET_WORK: FyndrWalletStepsProps[] = [
  {
    id: 1,
    imgURL: "/icons/paper-plane.svg",
    alt: "plane",
    title: "Refer a friend or business with your unique referral link.",
    icon: Navigation,
  },
  {
    id: 2,
    imgURL: "/icons/crown-outlined.svg",
    alt: "crown",
    title: "The friend/Business signs up.",
    icon: Crown,
  },
  {
    id: 3,
    imgURL: "/icons/wallet.svg",
    alt: "wallet",
    title:
      "You both receive $5 worth of Fyndr cash in your wallets instantly when an individual is referred.",
    icon: Wallet,
  },
  {
    id: 4,
    imgURL: "/icons/wallet.svg",
    alt: "wallet",
    title:
      "If a business is referred, you both receive $20 worth of Fyndr cash once the referred business completes their Stripe Integration.",
    icon: Wallet,
  },
];

export const WALET_TRANSACTION_DATA = new Map<
  string,
  { icon: string; text: string; amountColor: string }
>([
  [
    "CASHBACK",
    {
      icon: "/icons/wallet/promo-code.svg",
      text: "Cashback Reward Received",
      amountColor: "text-green-700",
    },
  ],
  [
    "PROMOCODE",
    {
      icon: "/icons/wallet/type-orange.svg",
      text: "Referral reward received by using code",
      amountColor: "text-green-700",
    },
  ],
  [
    "REFERRAL",
    {
      icon: "/icons/wallet/type-green.svg",
      text: "Referral reward received by using code",
      amountColor: "text-green-700",
    },
  ],
  [
    "REDEEMED",
    {
      icon: "/icons/wallet/redeemed.svg",
      text: "Fyndr Cash Redeemed",
      amountColor: "text-red-700",
    },
  ],
  [
    "FYNDR_CASH_EXPIRED",
    {
      icon: "/icons/wallet/fyndr-cash-expired.svg",
      text: "Fyndr Cash Expired",
      amountColor: "text-red-700",
    },
  ],
  [
    "REDEEM_PROMOCODE",
    {
      icon: "/icons/wallet/redeem-icon.png",
      text: "Promocode reward received by using code",
      amountColor: "text-green-700",
    },
  ],
  [
    "REGISTRATION_PROMOCODE",
    {
      icon: "/icons/wallet/promo-code.svg",
      text: "Promocode reward received by using code",
      amountColor: "text-green-700",
    },
  ],
]);
