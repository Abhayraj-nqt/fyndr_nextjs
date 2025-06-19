import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Button from "@/components/global/buttons";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";
import { parseStringCase } from "@/lib/utils/parser";

type Props = {
  categoryName: string;
  icon?: string | LucideIcon | React.ReactElement;
  isActive?: boolean;
  className?: string;
  alt?: string;
};

const CategoryCard = ({
  categoryName,
  icon: Icon,
  isActive = false,
  alt,
  className = "",
}: Props) => {
  const getIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === "string") {
      return (
        <Image
          src={Icon}
          alt={alt || categoryName}
          height={20}
          width={20}
          className="size-5"
        />
      );
    } else if (Icon && React.isValidElement(Icon)) {
      return <>{Icon}</>;
    } else if (Icon && typeof Icon === "function") {
      return <Icon />;
    }
  };

  return (
    <Link
      href={ROUTES.OFFER_LISTING_CATEGORY(
        parseStringCase({ input: categoryName, caseType: "lower-case" })
      )}
    >
      <Button
        variant="primary-dark-outlined"
        className={cn(
          // `body-medium rounded-lg px-6 py-3 capitalize shadow-none flex gap-2`,
          // "bg-secondary-10 text-secondary hover:bg-secondary-10",
          "!rounded-full border border-secondary-20 px-4 py-2 gap-2 body-3 bg-white transition duration-300",
          "hover:border-secondary-20 hover:scale-105",
          isActive ? `` : ``,
          className
        )}
        stdHeight
      >
        {Icon && <div>{getIcon()}</div>}
        <p className="text-secondary-80">{categoryName}</p>
      </Button>
    </Link>
  );
};

export default CategoryCard;
