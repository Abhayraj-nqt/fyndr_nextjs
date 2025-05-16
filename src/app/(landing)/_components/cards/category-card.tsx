import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import qs from "query-string";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

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
  const key = "query";
  const queryString = qs.parse("");
  queryString[key] = categoryName;

  const newUrl = qs.stringifyUrl({
    url: ROUTES.OFFER_LISTING,
    query: queryString,
  });

  const getIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === "string") {
      return (
        <Image src={Icon} alt={alt || categoryName} height={25} width={25} />
      );
    } else if (Icon && React.isValidElement(Icon)) {
      return <>{Icon}</>;
    } else if (Icon && typeof Icon === "function") {
      return <Icon />;
    }
  };

  return (
    <Link href={newUrl}>
      <Button
        className={cn(
          `body-medium rounded-lg px-6 py-3 capitalize shadow-none flex gap-2`,
          "bg-light-800 text-primary-900 hover:bg-light-800",
          isActive ? `` : ``,
          className
        )}
      >
        {Icon && <div>{getIcon()}</div>}
        <p>{categoryName}</p>
      </Button>
    </Link>
  );
};

export default CategoryCard;
