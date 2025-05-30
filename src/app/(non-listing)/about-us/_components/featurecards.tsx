import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface Props {
  imgURL: string;
  title: string;
  description: string;
  index: number;
  className?: string;
  isFirst?: boolean;
    hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const FeatureCard = ({ imgURL, title, description, index ,className ="", isFirst,
  hoveredIndex,
  setHoveredIndex,}: Props) => {
const isHovered = hoveredIndex === index;
  const isAnotherHovered = hoveredIndex !== null && !isHovered;
   const cardWidth = isFirst
    ? isAnotherHovered
      ? "w-60" // shrink first card when another is hovered
      : "w-[25rem]" // normal width
    : isHovered
      ? "w-[25rem]" // expand hovered card
      : "w-60"; // default width
  return (
    <div
      className={clsx(
        "relative h-[25rem] shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ease-in-out",
        cardWidth
      )}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
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
