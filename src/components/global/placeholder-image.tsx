"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import ASSETS from "@/constants/assets";

type Props = {
  src: string;
  alt: string;
  className?: string;
  height?: number;
  width?: number;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto" | undefined;
  loading?: "eager" | "lazy" | undefined;
  fill?: boolean | undefined;
  placeholderImageUrl?: string;
};

const PlaceholderImage = ({
  src,
  alt,
  className,
  fetchPriority,
  height,
  priority,
  width,
  loading,
  fill,
  placeholderImageUrl = ASSETS.IMAGES.PLACEHOLDER.FYNDR,
}: Props) => {
  const [imgUrl, setImgUrl] = useState<string>(placeholderImageUrl);

  useEffect(() => {
    setImgUrl(src);
  }, [src]);

  return (
    <Image
      src={imgUrl}
      alt={alt}
      height={height}
      width={width}
      fill={fill}
      priority={priority}
      fetchPriority={fetchPriority}
      loading={loading}
      className={`${className}`}
      placeholder="blur"
      blurDataURL={placeholderImageUrl}
      onError={() => setImgUrl(placeholderImageUrl)}
    />
  );
};

export default PlaceholderImage;
