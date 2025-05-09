"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

type Props = {
  route: string;
  placeholder: string;
  icon?: string | React.ReactElement;
  className?: string;
  inputClassName?: string;
  param?: string;
  navigateTo?: string;
  navigateParam?: string;
  onSearch?: (query: string) => void;
};

const LocalSearch = ({
  route,
  placeholder,
  className,
  icon: Icon,
  param = "query",
  inputClassName,
  navigateTo,
  navigateParam = "query",
  onSearch,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get(param) || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (navigateTo) return;

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: param,
          value: searchQuery,
        });

        if (pathname === route) {
          router.push(newUrl, { scroll: false });
        }
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: [param],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, pathname, route, router, searchParams, param, navigateTo]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      if (onSearch) {
        onSearch(searchQuery);
      } else if (navigateTo) {
        const queryParams = new URLSearchParams();
        queryParams.set(navigateParam, searchQuery);

        router.push(`${navigateTo}?${queryParams.toString()}`);
      }
    }
  };

  const getIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === "string") {
      return <Image src={Icon} alt={"search"} height={25} width={25} />;
    } else if (Icon && React.isValidElement(Icon)) {
      return <>{Icon}</>;
    }
    return null;
  };

  return (
    <div
      className={`flex min-h-[45px] grow items-center gap-4 rounded-lg border border-light-700 bg-light-900 px-4 ${className}`}
    >
      {getIcon()}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`no-focus paragraph-regular placeholder border-none text-dark-400 shadow-none outline-none ${inputClassName}`}
      />
    </div>
  );
};

export default LocalSearch;
