import React from "react";

import AboutRow from "./aboutRow";

type FyndrIndvItem = {
  title: string;
  content: string;
  image: string;
  imgDir: "left" | "right";
};

const ForFyndrIndividual = () => {
  const dataArray: FyndrIndvItem[] = [
    {
      title: "Offers & Coupons",
      content: `
        Get ready to unlock unbeatable deals and exclusive offers found here on Fyndr! Enjoy access to a plethora of discounts and promotions that make every purchase a win-win. Whether it's saving big on your favorite services or snagging a deal on a new experience, Fyndr's here to be your ticket to saving money while indulging in life's little luxuries. Start exploring our amazing offers today and treat yourself to savings like never before!
      `,
      image: "/images/aboutus/Offers&Coupons.png",
      imgDir: "right",
    },
    {
      title: "Events",
      content: `
        Get ready to be entertained, inspired, and connected with Fyndr's dynamic lineup of events! From side-splitting stand-up shows to electrifying concerts and thought-provoking global meets, there's something for every taste and interest. Whether you're in the mood for laughter, music, or networking, Fyndr's events promise unforgettable experiences and endless opportunities for fun and enrichment. So why wait? Dive into our exciting event calendar today and get ready to embark on a journey of discovery and excitement with Fyndr!
      `,
      image: "/images/aboutus/Events.png",
      imgDir: "left",
    },
    {
      title: "Browse our categories",
      content: `
        Whether you're looking for a day tour of the Grand Canyon or searching for your new go-to salon, Fyndr allows you to book appointments for each location. Ensuring smooth operations and exceptional customer service every step of the way, Fyndr is here to make your life easier.
      `,
      image: "/images/aboutus/FIndByCategories.png",
      imgDir: "right",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-8 p-4 py-10">
      {dataArray.map((item, index) => (
        <AboutRow
          key={index}
          title={item.title}
          content={item.content}
          imgURL={item.image}
          imgDir={item.imgDir}
          imageClassName="w-full sm:w-[30%]"
          textClassName="text-[1rem] font-bold text-black-80"
          titleClassName="text-[35px] font-[600] text-primary"
          symbol={true}
        />
      ))}
    </div>
  );
};

export default ForFyndrIndividual;
