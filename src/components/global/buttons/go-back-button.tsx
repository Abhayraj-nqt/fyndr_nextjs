"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  className?: string;
};

const GoBackButton = ({ className }: Props) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div
      onClick={handleGoBack}
      className={`flex-center body-2 min-w-fit max-w-fit cursor-pointer gap-1 text-black-60 ${className}`}
    >
      <ArrowLeft size={20} /> <span>Go Back</span>
    </div>
  );
};

export default GoBackButton;
