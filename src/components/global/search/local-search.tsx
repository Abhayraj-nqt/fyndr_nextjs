/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";

interface Props {
  route: string;
  placeholder: string;
  // icon?: string | React.ReactElement | LucideIcon;
  icon?: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  placeholder,
  otherClasses,
  icon: Icon,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  const getIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === "string") {
      return <Image src={Icon} alt={"search"} height={25} width={25} />;
    } else if (Icon && React.isValidElement(Icon)) {
      return <>{Icon}</>;
    } else if (Icon && typeof Icon === "function") {
      // return <Icon />;
    }
  };

  return (
    <div
      className={`flex min-h-[45px] grow items-center gap-4 rounded-lg border border-light-700 bg-light-900 px-4 ${otherClasses}`}
    >
      {getIcon()}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="no-focus paragraph-regular placeholder border-none text-dark-400 shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
