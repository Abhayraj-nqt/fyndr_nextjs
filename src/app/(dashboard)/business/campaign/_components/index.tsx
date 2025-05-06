"use client";
import { CampaignProps } from "@/types/campaign";
import CampaignList from "./campaign_list";
import Indicators from "./indicators";
import { useState, useMemo } from "react";

type Props = {
  campaigns: CampaignProps[];
};

const Campaigns = ({ campaigns }: Props) => {
  const [filter, setFilter] = useState<string>("all");

  const handleFilterClick = (key: string) => {
    setFilter((prev) => (prev === key ? "all" : key));
  };

  const isValidDate = (date: string | null | undefined): boolean => {
    const d = new Date(date ?? "");
    return !!date && !isNaN(d.getTime());
  };

  const filteredCampaigns = useMemo(() => {
    const currDate = new Date();

    let result = campaigns.filter((cmpn) => {
      if (cmpn.cmpnType === "brochure") return false;

      const featuredEnd = isValidDate(cmpn.featuredEndDt)
        ? new Date(cmpn.featuredEndDt!)
        : new Date(0);
      switch (filter) {
        case "featured":
          return cmpn.isFeatured && featuredEnd > currDate;
        case "expired":
          return featuredEnd < currDate && cmpn.isFeatured;
        case "expiringSoon": {
          const daysLeft =
            (featuredEnd.getTime() - currDate.getTime()) /
            (1000 * 60 * 60 * 24);
          return cmpn.isFeatured && daysLeft <= 10 && daysLeft >= 0;
        }
        case "neverPromoted":
          return !cmpn.isFeatured;
        case "active":
          return cmpn.status === "active";
        case "inactive":
          return cmpn.status === "inactive";
        default:
          return true;
      }
    });
    let finalList = result;
    if (filter === "all") {
      const featured = result.filter((c) => c.isFeatured);
      const nonFeatured = result.filter((c) => !c.isFeatured);

      featured.sort((a, b) => {
        const aDate = isValidDate(a.featuredEndDt)
          ? new Date(a.featuredEndDt!)
          : new Date(0);
        const bDate = isValidDate(b.featuredEndDt)
          ? new Date(b.featuredEndDt!)
          : new Date(0);
        return aDate.getTime() - bDate.getTime();
      });
      nonFeatured.sort(
        (a, b) => new Date(b.endDt).getTime() - new Date(a.endDt).getTime()
      );
      finalList = [...featured, ...nonFeatured];
    }

    return finalList;
  }, [filter, campaigns]);

  return (
    <div className="border border-solid-black p-4">
      <Indicators selected={filter} onSelect={handleFilterClick} />
      <div className="mt-1">
        <CampaignList campaigns={filteredCampaigns} />
      </div>
    </div>
  );
};

export default Campaigns;
