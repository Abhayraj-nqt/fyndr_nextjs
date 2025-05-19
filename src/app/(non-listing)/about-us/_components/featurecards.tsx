import Image from "next/image";
import React from "react";

interface Props {
  imgURL: string;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ imgURL, title, description, index }: Props) => {
  return (
    <div className="relative size-[25rem] overflow-hidden rounded-lg transition-all duration-300 md:h-[25rem] md:w-60 md:hover:w-[25rem]">
    
    {/* //   className={`
    //     relative w-60 shrink-0 overflow-hidden rounded-lg transition-all
    //     duration-300
    //     ${index === 0 ? "grow-size-[25rem]" : "w-60"}
    //     hover:grow
    //     group-hover:grow
    //   `}
    // > */}
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
