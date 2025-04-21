"use client";

import { useSession } from "next-auth/react";

import { useGetCampaigns } from "@/hooks/campaigns";

import FeaturedCampaigns from "../featured-campaigns";

const CampaignsSection = () => {
  const session = useSession();

  const user = session.data?.user;

  if (!user) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, onGetFeaturedCampaigns } = useGetCampaigns(
    {
      page: 0,
      pageSize: 500,
    },
    {
      indvId: Number(user.id),
      distance: 50,
      location: user.location,
      categories: [],
      fetchById: "none",
      fetchByGoal: "INSTORE",
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <FeaturedCampaigns onGetFeaturedCampaigns={onGetFeaturedCampaigns} />
      )}
    </div>
  );
};

export default CampaignsSection;
