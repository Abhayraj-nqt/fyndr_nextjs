import Image from "next/image"; // Or use 'img' tag as an alternative
import React from "react";

interface AboutUsLeftProps {
  title: string;
  content: string;
  image: string;
  index: number;
  totalItems: number;
}

export default function AboutUsLeft({
  title,
  content,
  image,
}: AboutUsLeftProps) {
  return (
    <>
      {title && (
        <div className="my-8 flex justify-center">
          <div className="flex w-[88%] flex-col gap-10 md:flex-row ">
            {/* Left Column (Text) */}
            <div className="text-center md:text-left">
              <div className="text-[1rem] font-bold text-[#1e90ff]">
                &#9886;
              </div>

              <h4 className="text-4xl text-[#257CDB]">{title}</h4>

              <p className="mt-4 text-[1rem] font-medium text-[#333333]">
                {content}
              </p>
            </div>

            {/* Right Column (Image) */}
            <div className="flex justify-center md:justify-start">
              <Image
                src={image}
                alt="image"
                width={900} // 26rem
                height={450} // 26rem
                className="rounded-lg object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
