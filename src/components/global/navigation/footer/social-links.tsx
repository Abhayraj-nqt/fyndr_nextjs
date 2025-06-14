import Image from "next/image";
import Link from "next/link";
import React from "react";

import { SITE } from "@/constants/site";

interface Props {
  className?: string;
}

const SocialLinks = ({ className }: Props) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      {SITE.socialLinks.map(({ icon, label, url }) => (
        <Link
          href={url}
          key={label}
          className="flex items-center text-secondary-20"
        >
          {typeof icon === "function" ? (
            React.createElement(icon, { size: 30 })
          ) : typeof icon === "string" ? (
            <Image
              src={icon}
              alt={label}
              width={35}
              height={35}
              className="xs:size-6 md:size-8"
            />
          ) : icon?.src ? (
            <Image src={icon} alt={label} width={20} height={20} />
          ) : null}
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
