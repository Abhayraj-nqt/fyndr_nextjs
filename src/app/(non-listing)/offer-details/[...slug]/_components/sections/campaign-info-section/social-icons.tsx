"use client";

import { Heart, Share2, Globe, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

import { onLikeCampaign } from "@/actions/campaign.action";
import FacebookShare from "@/components/global/facebook-share";
import MailTo from "@/components/global/mail-to";
import toast from "@/components/global/toast";
import WebsiteTo from "@/components/global/website-to";
import ROUTES from "@/constants/routes";
import { HOST } from "@/environment";
import { LikeCampaignParams } from "@/types/campaign/campaign.params";
import { Campaign } from "@/types/campaign/campaign.types";

type Props = {
  campaign: Campaign;
};

const SocialIcons = ({ campaign }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const currentUrl = `${HOST}${ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}`;
  const email = campaign.biz?.bizEmail || "";
  const subject = `${campaign.biz.bizName}: ${campaign.title}`;
  const body =
    `Found this deal on fyndr:\n` + `${campaign.title}\n` + `${currentUrl}`;

  const isLiked =
    campaign?.indvCmpn?.objid && campaign?.indvCmpn?.isDeleted === false;
  const disabled = false;

  const handleLikeCampaign = async () => {
    if (!session || !session.user) {
      toast.error({
        message: "Please login first",
      });
      return;
    }

    const isLiked =
      campaign?.indvCmpn?.objid && campaign?.indvCmpn?.isDeleted === false;

    const newIsDeleted = !!isLiked;

    const payload: LikeCampaignParams["payload"] = {
      bizId: campaign.biz.bizid,
      cmpnId: campaign.objid,
      indvId: Number(session.user.id),
      isDeleted: newIsDeleted,
      objid: campaign?.indvCmpn?.objid || null,
    };

    const { success, data } = await onLikeCampaign({
      payload,
    });

    console.log({ success, payload, data });

    if (success) {
      router.refresh();
    } else {
      toast.error({
        message: "Failed",
      });
    }
  };

  return (
    <div className="flex items-center gap-4 text-black-60">
      <MailTo email="" subject={subject} body={body}>
        <Share2 size={20} />
      </MailTo>
      {campaign.biz.website && (
        <WebsiteTo url={campaign.biz.website}>
          <Globe size={20} />
        </WebsiteTo>
      )}
      <MailTo email={email} subject={""} body={""}>
        <Mail size={20} />
      </MailTo>
      <FacebookShare url={currentUrl} />

      <div className="flex-center gap-1">
        <button
          onClick={handleLikeCampaign}
          disabled={disabled}
          className="flex items-center transition-opacity disabled:opacity-50"
        >
          {isLiked ? (
            <Heart
              fill="#ef4444"
              strokeWidth={0}
              size={20}
              className="cursor-pointer"
            />
          ) : (
            <Heart size={20} className="cursor-pointer" />
          )}
        </button>
        {campaign.likedCount > 0 ? <p>{campaign.likedCount}</p> : <></>}
      </div>
    </div>
  );
};

export default SocialIcons;
