import Image from "next/image";
import React from "react";

interface OptionIconProps {
  icon?: string | React.ReactNode;
  label: string;
}

export const OptionIcon: React.FC<OptionIconProps> = ({ icon, label }) => {
  if (!icon) return null;

  if (typeof icon === "string") {
    return (
      <Image
        src={icon}
        alt={label}
        height={25}
        width={25}
        className="size-4 shrink-0 object-contain"
      />
    );
  }

  return <span className="shrink-0">{icon}</span>;
};
