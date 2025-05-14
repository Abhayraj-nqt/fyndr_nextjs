import React from "react";

import AboutUsLeft from "./AboutUsLeft";
import AboutUsRight from "./AboutUsRight";


const ForFyndrIndividual = () => {
  const dataArray2 = [
    {
      title: "Offers & Coupons",
      content: `
        Get ready to unlock unbeatable deals and exclusive offers found here on Fyndr! Enjoy access to a plethora of discounts and promotions that make every purchase a win-win. Whether it's saving big on your favorite services or snagging a deal on a new experience, Fyndr's here to be your ticket to saving money while indulging in life's little luxuries. Start exploring our amazing offers today and treat yourself to savings like never before!
      `,
      image: "/images/aboutus/Offers&Coupons.png",
    },
    {
      title: "Events",
      content: `
        Get ready to be entertained, inspired, and connected with Fyndr's dynamic lineup of events! From side-splitting stand-up shows to electrifying concerts and thought-provoking global meets, there's something for every taste and interest. Whether you're in the mood for laughter, music, or networking, Fyndr's events promise unforgettable experiences and endless opportunities for fun and enrichment. So why wait? Dive into our exciting event calendar today and get ready to embark on a journey of discovery and excitement with Fyndr!
      `,
      image: "/images/aboutus/Events.png",
    },
    {
      title: "Browse our categories",
      content: `
        Whether you're looking for a day tour of the Grand Canyon or searching for your new go-to salon, Fyndr allows you to book appointments for each location. Ensuring smooth operations and exceptional customer service every step of the way, Fyndr is here to make your life easier.
      `,
      image: "/images/aboutus/FIndByCategories.png",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {dataArray2.map((item, index) => {
        const isEvenIndex = index % 2 === 0;

        if (isEvenIndex) {
          return (
            <AboutUsLeft
              key={index}
              title={item.title}
              content={item.content}
              image={item.image}
              index={index}
              totalItems={dataArray2.length}
            />
          );
        } else {
          return (
            <AboutUsRight
              key={index}
              title={item.title}
              content={item.content}
              image={item.image}
            />
          );
        }
      })}
    </div>
  );
};

export default ForFyndrIndividual;
