import { Heart, Share2, Globe, Mail, Facebook } from "lucide-react";
import React from "react";

const SocialIcons = () => {
  return (
    <div className="flex gap-4 text-black-80">
      <Heart />
      <Share2 />
      <Globe />
      <Mail />
      <Facebook />
    </div>
  );
};

export default SocialIcons;
