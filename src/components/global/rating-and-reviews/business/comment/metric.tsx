import Image from "next/image";
import Link from "next/link";
import React from "react";

import UserAvatar from "@/components/global/user-avatar";
import { cn } from "@/lib/utils";

interface Props {
  imgUrl?: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles: string;
  imgStyles?: string;
  titleStyles?: string;
  name?: string;
}

const Metric = ({
  title,
  value,
  href,
  alt,
  imgUrl,
  imgStyles,
  textStyles,
  titleStyles,
  name,
}: Props) => {
  const metricContent = (
    <>
      {imgUrl ? (
        <Image
          src={imgUrl}
          height={16}
          width={16}
          alt={alt}
          className={`size-6 rounded-full ${imgStyles}`}
        />
      ) : (
        <UserAvatar
          name={`${name?.charAt(0)}`}
          fallbackClassName="size-8"
          className="size-8"
        />
      )}
      <p className={`text-black-80 ${textStyles} flex items-center gap-1`}>
        {value}
        {title ? (
          <span className={cn(`body-5 line-clamp-1`, titleStyles)}>
            {title}
          </span>
        ) : null}
      </p>
    </>
  );

  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;
