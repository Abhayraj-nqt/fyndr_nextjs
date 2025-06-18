import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { CampaignProps } from "@/types/campaign";

import NonFeaturedFyndsCard from "./cards/non-featured-fynds-card";

type Props = {
  campaigns: CampaignProps[];
  title: string;
};

const NearbyCampaigns = ({ campaigns, title }: Props) => {
  return (
    <section className="mt-10 flex flex-col p-4 sm:p-0">
      <h2 className="heading-6-medium text-black-80">{title}</h2>
      {/* <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> */}
      <div className="my-6 grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] place-items-center gap-4">
        {campaigns.map((campaign) => (
          <Link
            key={campaign.objid}
            href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
          >
            <NonFeaturedFyndsCard campaign={campaign} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NearbyCampaigns;
