/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  visibleHeight?: number;
};

const GoTopButton = ({ visibleHeight = 400 }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > visibleHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

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
