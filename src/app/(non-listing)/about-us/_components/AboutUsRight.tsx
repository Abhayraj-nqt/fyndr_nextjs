import Image from "next/image";
import React from "react";



interface AboutUsRightProps {
  title: string;
  content: string;
  image: string; 
  buttonClick?: () => void;
}

export default function AboutUsRight({
  title,
  content,
  image,
}: AboutUsRightProps) {


  return (
    <>
      {title && (
        <div className="my-8 flex justify-center">
          <div className="flex  w-[88%] flex-col justify-between gap-10 md:flex-row">
            
                <div className="flex justify-center md:justify-start">
                  <Image
                    src={image}
                    alt="About Fyndr: A marketplace platform"
                    width={900}
                    height={450}
                    className="rounded-lg object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-center md:text-left">
                <div className="text-[1rem] font-bold text-[#1e90ff]">&#9886;</div>
                 
                    <h4 className="text-4xl text-[#257CDB]">{title}</h4>
                
                  <p className="mt-4 text-[1rem] font-medium text-[#333333]">
                    {content}
                  </p>
                  {/* {buttonText && (
                    <button
                      onClick={buttonClick}
                      className="mt-4 rounded-lg bg-[#257CDB] px-8 py-3 text-xl text-white"
                    >
                      {buttonText}
                    </button>
                  )} */}
                </div>
           </div>
            
        </div>
      )}
    </>
  );
}
