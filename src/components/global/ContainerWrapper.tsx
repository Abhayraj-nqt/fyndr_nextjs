"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import React, { ReactNode } from "react";

interface ContainerWrapperProps {
  title?: string;
  headerOption?: ReactNode;
  children?: ReactNode;
  featured?: boolean;
  noPadding?: boolean;
}

const ContainerWrapper: React.FC<ContainerWrapperProps> = ({
  title,
  headerOption,
  children,
  featured,
  noPadding,
}) => {
  const paddingX = "px-8";
  const paddingTop = "pt-4";
  const paddingBottom = "pb-4";
  const isMobile = useIsMobile();
  return (
    <div
      className={`w-full mx-auto ${paddingX} ${paddingTop} ${paddingBottom} max-w-screen-xl bg-gray-100`}
    >
      <article>
        <div
          className={`flex-between ${
            headerOption ? "mb-8" : ""
          } ${isMobile ? "h-[45px]" : headerOption ? "h-[32px]" : ""}`}
        >
          {title && (
            <h2
              className={`text-2xl font-semibold text-blue-400 ${!headerOption ? "mb-8" : ""}`}
            >
              {title}
            </h2>
          )}
          {headerOption && <div>{headerOption}</div>}
        </div>

        <div
          className={`${noPadding ? "" : "p-10"} bg-white rounded-[10px] shadow-sm`}
        >
          <div className="bg-white rounded-lg shadow-sm">
            <div className={`"p-5"} ${!featured ? "" : ""}`}>{children}</div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ContainerWrapper;
