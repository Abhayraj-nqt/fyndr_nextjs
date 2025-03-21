import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import {
  CompanyProps,
  Coordinates,
  FyndrAboutFeatureProps,
  FyndrAboutProps,
  FyndrWalletStepsProps,
  ValueLabelProps,
} from "@/types/global";

export const FYNDR_ABOUT_AND_MISSION: FyndrAboutProps[] = [
  {
    imgURL: "/images/about-fyndr.png",
    title: "About Fyndr",
    imgDir: "right",
    content:
      "Fyndr is your trusted marketplace platform for businesses and users alike. Fyndr offers a comprehensive suite of tools to sell services online, create promotional campaigns, and attract customers with enticing deals and coupons. For individual users, Fyndr simplifies the process of booking appointments, accessing attractive offers, or organizing events. Whether you're a small business owner looking to expand your reach or an individual seeking convenience and savings, Fyndr has got you covered.",
  },
  {
    imgURL: "/images/our-mission.png",
    title: "Our Mission",
    imgDir: "left",
    content:
      "At Fyndr, our mission is to empower businesses to thrive in the digital age. We're dedicated to providing a comprehensive platform that enables businesses to sell their services online, effortlessly create effective marketing campaigns, and offer enticing deals and coupons to their customers. Our goal is to make it easy for businesses to connect with their audience and grow their customer base. With our intuitive website and user-friendly application, customers can conveniently book appointments, ensuring a seamless experience for both businesses and their clients. At Fyndr, we're committed to helping businesses succeed by providing them with the tools and resources they need to flourish in today's competitive market landscape.",
  },
];

export const HOW_TO_USE_BUSINESS: FyndrAboutProps[] = [
  {
    imgURL: "/images/appointments.png",
    title: "Appointments",
    imgDir: "right",
    content:
      "By utilizing Fyndr, you will be able to manage all of your appointments in one place with our innovative booking feature. No more missed opportunities or scheduling headaches. Fyndr empowers you to stay organized and in control of your business schedule like never before.",
  },
  {
    imgURL: "/images/multiple-locations.png",
    title: "Manage Multiple Locations",
    imgDir: "left",
    content:
      "With Fyndr's powerful business management tools, overseeing multiple locations of your business is a breeze. Tailor campaigns to specific locations to target your audience effectively, boosting engagement and driving sales where it matters most. Fyndr makes it seamless to manage appointments and ensure smooth operations and customer service.",
  },
  {
    imgURL: "/images/qr-code.png",
    title: "Get Your QR code",
    imgDir: "right",
    content:
      "With Fyndr’s innovative QR code feature, your business is front and center, capturing the attention of curious customers. Imagine your personalized QR code popping up everywhere – on billboards, street signs, social media ads – you name it. Wherever it's seen, all it takes is a quick scan for potential customers to be whisked away to your business's page, ready to explore what you have to offer.",
  },
  {
    imgURL: "/images/campaigns.png",
    title: "Campaigns",
    imgDir: "left",
    content:
      "Imagine you've got multiple locations, each with its own unique vibe and customer base. With Fyndr, you can create different campaigns for each location, so you can tailor your promotions to match the preferences of each audience. Whether you're offering a special deal, hosting an event, or launching a new product, you can easily promote it to the right people at the right place, maximizing your impact to drive more sales.",
  },
];

export const HOW_TO_USE_INDIVIDUAL: FyndrAboutProps[] = [
  {
    imgURL: "/images/offers-coupons.png",
    title: "Offers & Coupons",
    imgDir: "right",
    content:
      "Get ready to unlock unbeatable deals and exclusive offers found here on Fyndr! Enjoy access to a plethora of discounts and promotions that make every purchase a win-win. Whether it's saving big on your favorite services or snagging a deal on a new experience, Fyndr's here to be your ticket to saving money while indulging in life's little luxuries. Start exploring our amazing offers today and treat yourself to savings like never before!",
  },
  {
    imgURL: "/images/events.png",
    title: "Events",
    imgDir: "left",
    content:
      "Get ready to be entertained, inspired, and connected with Fyndr's dynamic lineup of events! From side-splitting stand-up shows to electrifying concerts and thought-provoking global meets, there's something for every taste and interest. Whether you're in the mood for laughter, music, or networking, Fyndr's events promise unforgettable experiences and endless opportunities for fun and enrichment. So why wait? Dive into our exciting event calendar today and get ready to embark on a journey of discovery and excitement with Fyndr!",
  },
  {
    imgURL: "/images/browse-categories.png",
    title: "Browse our categories",
    imgDir: "right",
    content:
      "Whether you’re looking for a day tour of the Grand Canyon or searching for your new go-to salon, Fyndr allows you to book appointments for each location. Ensuring smooth operations and exceptional customer service every step of the way, Fyndr is here to make your life easier.",
  },
];

export const ABOUT_PAGE_FEATURES: FyndrAboutFeatureProps[] = [
  {
    imgURL: "/images/contactless-payment.png",
    title: "Contactless Payment",
    description:
      "Seamlessly manage payments, invoices, and orders, all in one place",
  },
  {
    imgURL: "/images/online-storefront.jpg",
    title: "Online Storefront",
    description: "Create stunning online storefronts.",
  },
  {
    imgURL: "/images/promote-your-business.jpg",
    title: "Promote Your Business",
    description: "Promote your business deals and expand your reach",
  },
  {
    imgURL: "/images/manage-appointments.jpg",
    title: "Manage Appointments",
    description: "Oversee all your appointments in one place",
  },
];

export const TYPES_OF_DEALS: ValueLabelProps[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Coupons",
    value: "COUPONS",
  },
  {
    label: "Offers",
    value: "OFFERS",
  },
  {
    label: "Events",
    value: "EVENTS",
  },
];

export const HOW_DOES_WALLET_WORK: FyndrWalletStepsProps[] = [
  {
    id: 1,
    imgURL: "/icons/paper-plane.svg",
    alt: "plane",
    title: "Refer a friend or business with your unique referral link.",
  },
  {
    id: 2,
    imgURL: "/icons/crown-outlined.svg",
    alt: "crown",
    title: "The friend/Business signs up.",
  },
  {
    id: 3,
    imgURL: "/icons/wallet.svg",
    alt: "wallet",
    title:
      "You both receive $5 worth of Fyndr cash in your wallets instantly when an individual is referred.",
  },
  {
    id: 4,
    imgURL: "/icons/wallet.svg",
    alt: "wallet",
    title:
      "If a business is referred, you both receive $20 worth of Fyndr cash once the referred business completes their Stripe Integration.",
  },
];

export const COMPANY: CompanyProps = {
  name: "Fyndr",
  socialLinks: [
    {
      label: "Facebook",
      icon: Facebook,
      url: "",
    },
    {
      label: "Instagram",
      icon: Instagram,
      url: "",
    },
    {
      label: "Linkedin",
      icon: Linkedin,
      url: "",
    },
    {
      label: "Twitter",
      icon: Twitter,
      url: "",
    },
  ],
};

export const CAT_LIST_HOME = [
  { keyword: "Entertainment", title: "Explore Exciting Activities Nearby" },
  {
    keyword: "Food & Beverages",
    title: "Discover Dining Experiences Near You",
  },
  { keyword: "Beauty & Wellness", title: "Nearby Beauty Finds" },
];

export const DEFAULT_LOCATION: Coordinates = {
  lat: 33.6629442, // Default to Phenix, AZ
  lng: -112.0182329,
};
