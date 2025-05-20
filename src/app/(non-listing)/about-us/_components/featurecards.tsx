import Image from "next/image";
import React from "react";

interface Props {
  imgURL: string;
  title: string;
  description: string;
  index: number;
  className?: string;
}

const FeatureCard = ({ imgURL, title, description, index }: Props) => {
  return (
    <div
      className={`
        group/card relative h-[25rem] shrink-0 cursor-pointer overflow-hidden rounded-lg
        transition-all duration-300 ease-in-out
        ${
          index === 0
            ? "w-[25rem] hover:w-[25rem] group-hover:w-60 "
            : "w-60 hover:w-[25rem]"
        }
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

      <div className="absolute bottom-6 left-6 z-10 text-light-900">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-white">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
