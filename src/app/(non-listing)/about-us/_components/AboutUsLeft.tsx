import Image from "next/image";
import React from "react";

interface AboutUsLeftProps {
  title: string;
  content: string;
  image: string;

}

export default function AboutUsLeft({
  title,
  content,
  image,
}: AboutUsLeftProps) {
  return (
    <>
      {title && (
        <div className="my-8  flex  w-full items-center justify-center">
          <div className="flex w-[88%] justify-center gap-10 md:flex-row ">
            <div className="relative w-4/5 text-center md:text-left">
              <div className="absolute left-[-14px] top-[-10px] rotate-45  text-[1rem] font-bold text-[#1e90ff]">
                &#9886;
              </div>

              <h4 className="text-4xl text-[#257CDB]">{title}</h4>

              <p className="mt-4 text-[1rem] font-medium text-[#333333]">
                {content}
              </p>
            </div>

            <div className=" flex w-2/5 justify-center md:justify-start">
              <Image
                src={image}
                alt="image"
                width={400}
                height={450}
                className=" rounded-lg object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
