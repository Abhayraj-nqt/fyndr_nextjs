import Link from "next/link";
import React from "react";

import { COMPANY } from "@/constants";

interface Props {
  className?: string;
}

const SocialLinks = ({ className }: Props) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      {COMPANY.socialLinks.map(({ icon: Icon, label, url }) => (
        <Link href={url} key={label} className="text-light-700">
          <Icon size={20} />
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
