"use client";

import { Facebook } from "lucide-react";
import React, { useCallback } from "react";

import toast from "./toast";

type Props = {
  url: string;
  title?: string;
  children?: React.ReactNode;
};

const FacebookShare = ({ url, title, children }: Props) => {
  const shareOnFacebook = useCallback(async ({ url, title }: Props) => {
    try {
      const encodedUrl = encodeURIComponent(url);
      const encodedTitle = title ? encodeURIComponent(title) : "";

      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&t=${encodedTitle}`;

      const popup = window.open(
        shareUrl,
        "facebook-share",
        "width=600,height=400,scrollbars=yes,resizable=yes"
      );

      // Optional: Focus the popup if it was successfully opened
      if (popup) {
        popup.focus();
      }
    } catch (error) {
      console.error("Error sharing to Facebook:", error);
      toast.error({
        message: "Failed to open Facebook share dialog",
      });
    }
  }, []);

  return (
    <div
      onClick={() => shareOnFacebook({ url, title })}
      className="cursor-pointer"
    >
      {children || <Facebook size={20} className="text-black-60" />}
    </div>
  );
};

export default FacebookShare;
