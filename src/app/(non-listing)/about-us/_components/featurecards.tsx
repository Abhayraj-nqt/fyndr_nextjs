import Image from "next/image";
import React from "react";

interface Props {
  imgURL: string;
  title: string;
  description: string;
  index: number;
  className?: string;
}

const FeatureCard = ({
  imgURL,
  title,
  description,
  index,
  className = "",
}: Props) => {
  const isFirst = index === 0;
  return (
    <div
      className={`
        relative h-[25rem] shrink-0 cursor-pointer overflow-hidden rounded-lg
        transition-all duration-300 ease-in-out
        ${
          isFirst
            ? // For index 0: wide by default, shrink on group-hover — but not if it's the only one hovered
              "w-[25rem] hover:!w-[25rem] group-hover:w-60"
            : // For others: narrow by default, expand on hover
              "w-60 hover:w-[25rem]"
        }
        ${className}
      `}
    >
      <Image
        src={imgURL}
        alt={title}
        height={500}
        width={500}
        className="size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute bottom-6 left-6 z-10 text-white">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-white">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
