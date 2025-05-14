import Image from "next/image";
import React from "react";

const Download = () => {
  return (
    <div className="w-full bg-white py-6">
      <div className="flex items-center justify-center gap-8 md:flex-row">
        {/* Left Side - QR Code */}

        <div className="flex items-center justify-center rounded-lg bg-[#257cdb] p-12">
          <Image
            src="/images/aboutus/downloadUsQr.png"
            width={120}
            height={120}
            alt="QR Code"
            className="h-44 w-auto"
          />
        </div>

        {/* Right Side - Text + Bullet Points + Logo */}
        <div className="flex w-3/5 justify-between  rounded-lg bg-[linear-gradient(90deg,_#b6d9ff_-63.27%,_#fff)] pb-16 pl-6 pt-4">
          {/* Heading */}

          <div>
            <span className="text-[20px] font-normal leading-[36px]">
              Explore Your City & Make Life Easier with the Fyndr App.
            </span>

            {/* Bullet Points */}
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-[20px] font-normal leading-[46px]">
                • Book appointments effortlessly.
              </span>
              <span className="flex items-center gap-2 text-[20px] font-normal leading-[46px]">
                • Unlock real-time deals near you.
              </span>
              <span className="flex items-center gap-2 text-[20px] font-normal leading-[46px]">
                • Discover tailored campaigns and exclusive offers.
              </span>
            </div>
          </div>

          {/* Logo or Additional Image */}
          <div>
            <Image
              src={"/images/aboutus/Transparent-backgroud-fyndr-logo.png"}
              alt="Fyndr Logo"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Bottom Container */}
      <div className="mt-5 flex  justify-center">
        <div className=" flex w-4/5 flex-col  justify-between gap-8 rounded-lg bg-[#f9f9f9] p-6 md:flex-row">
          {/* Text Content */}
          <div className="">
            <div className="mb-2 flex items-center gap-2">
              <Image
                src="/images/aboutus/Transparent-backgroud-fyndr-logo.png"
                alt="fyndr"
                width={30}
                height={30}
              />
              <span className="text-xl font-normal text-[#257cdb] underline">
                Save Big
              </span>
            </div>
            <span className="text-base font-normal text-gray-700">
              Save up to 70% on local services, events, and activities with
              exclusive offers and discounts.
            </span>
            <div className="mt-4 flex flex-col gap-2 text-[#333]">
              <span className="">• Amazing Deals</span>
              <span className="">• Effortless Bookings</span>
              <span className="">• Discover Events</span>
              <span className="">• Personalized Experience</span>
            </div>
          </div>

          {/* Phone Image */}
          <div className="flex flex-1 justify-center">
            <Image
              src={"/images/aboutus/mobileImageBottom.png"}
              alt="Download Fyndr App and save upto 70% on local services"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
