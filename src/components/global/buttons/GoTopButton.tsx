"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const GoTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        // Show button after scrolling down 200px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <Image
        src={"/icons/top-circle.svg"}
        alt="go top"
        height={40}
        width={40}
        className="fixed bottom-4 right-4 z-30 cursor-pointer"
        onClick={scrollToTop}
      />
    )
  );
};

export default GoTopButton;
