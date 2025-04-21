import Image from "next/image";
import React from "react";

interface Props {
  imgURL: string;
  title: string;
  content: string;
  imgDir?: "left" | "right";
}

const AboutRow = ({ imgDir = "left", title, content, imgURL }: Props) => {
  return (
    <div
      className={`flex flex-col-reverse gap-8 md:flex-row ${imgDir === "right" ? "md:flex-row-reverse" : ""}`}
    >
      <Image
        src={imgURL}
        alt={title}
        width={300}
        height={300}
        className={`${imgDir === "left" ? "max-w-80" : "max-w-64"} mx-auto block object-contain`}
      />
      <div className="flex flex-col space-y-2">
        <h1 className="text-[30px] font-normal leading-[42px] text-primary-500">
          {title}
        </h1>
        <p className="paragraph-regular max-w-4xl first-letter:text-2xl">
          {content}
        </p>
      </div>
    </div>
  );
};

export default AboutRow;
