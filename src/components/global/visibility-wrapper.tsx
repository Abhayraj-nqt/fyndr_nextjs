/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

type VisibilityWrapperProps = {
  children: React.ReactNode;
  visibleHeight?: number;
  hide?: number;
};

const VisibilityWrapper = ({
  children,
  visibleHeight = 400,
  hide = Infinity,
}: VisibilityWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > visibleHeight && window.scrollY < hide) {
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

  return isVisible ? children : <></>;
};

export default VisibilityWrapper;
