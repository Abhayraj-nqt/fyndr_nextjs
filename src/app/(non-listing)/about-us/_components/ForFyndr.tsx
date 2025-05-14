import React from "react";

import AboutUsLeft from "./AboutUsLeft";
import AboutUsRight from "./AboutUsRight";

const ForFyndr = () => {
  const dataArray = [
    {
      title: "Appointments",
      content: `By utilizing Fyndr, you will be able to manage all of your appointments in one place with our innovative booking feature. No more missed opportunities or scheduling headaches. Fyndr empowers you to stay organized and in control of your business schedule like never before.`,
      image: "/images/aboutus/appointments2.png",
    
    },
    {
      title: "Manage Multiple Locations",
      content: `With Fyndr's powerful business management tools, overseeing multiple locations of your business is a breeze. Tailor campaigns to specific locations to target your audience effectively, boosting engagement and driving sales where it matters most. Fyndr makes it seamless to manage appointments and ensure smooth operations and customer service.`,
      image: "/images/aboutus/Manage-multiple-stores.png",
 
    },
    {
      title: "Get Your QR code",
      content: `With Fyndr’s innovative QR code feature, your business is front and center, capturing the attention of curious customers. Imagine your personalized QR code popping up everywhere – on billboards, street signs, social media ads – you name it. Wherever it's seen, all it takes is a quick scan for potential customers to be whisked away to your business's page, ready to explore what you have to offer.`,
      image: "/images/aboutus/Qrcode.webp",
    
    },
    {
      title: "Campaigns",
      content: `Imagine you've got multiple locations, each with its own unique vibe and customer base. With Fyndr, you can create different campaigns for each location, so you can tailor your promotions to match the preferences of each audience. Whether you're offering a special deal, hosting an event, or launching a new product, you can easily promote it to the right people at the right place, maximizing your impact to drive more sales.

`,
      image: "/images/aboutus/Campaigns.webp",
    
    },
  ];

  return (
    <div className="w-full space-y-8">
      {dataArray.map((item, index) => {
        const isEvenIndex = index % 2 === 0;

        // Pass buttonClick only when necessary (here, we skip for "AboutUsRight" in case of no button)
        if (isEvenIndex) {
          return (
            <AboutUsLeft
              key={index}
              title={item.title}
              content={item.content}
              image={item.image}
              index={index}
              totalItems={dataArray.length}
            />
          );
        } else {
          return (
            <AboutUsRight
              key={index}
              title={item.title}
              content={item.content}
              image={item.image}
              
             
              // Only pass buttonClick prop if it's needed
            //   buttonClick={
            //     item.buttonText ? () => alert("Button clicked!") : undefined
            //   }
            />
          );
        }
      })}
    </div>
  );
};

export default ForFyndr;
