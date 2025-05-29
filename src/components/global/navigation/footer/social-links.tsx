import Image from "next/image";
import Link from "next/link";
import React from "react";

import { COMPANY } from "@/constants";

interface Props {
  className?: string;
}

const SocialLinks = ({ className }: Props) => {
  return (
    <div className={`flex gap-4 pl-5 ${className}`}>
      {COMPANY.socialLinks.map(({ icon, label, url }) => (
        <Link
          href={url}
          key={label}
          className="flex items-center text-light-700"
        >
          {typeof icon === "function" ? (
            React.createElement(icon, { size: 30 })
          ) : typeof icon === "string" ? (
            <img src={icon} alt={label} width={35} height={35} />
          ) : icon?.src ? (
            <Image src={icon} alt={label} width={20} height={20} />
          ) : null}
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
