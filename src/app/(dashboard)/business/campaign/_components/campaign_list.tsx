"use client";
import { Pencil, Megaphone } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import { CampaignProps } from "@/types/campaign";

import List from "../../_components/list";
type Props = {
  campaigns: CampaignProps[];
};

const CampaignList = ({ campaigns }: Props) => {
  const isValidDate = (date: string | null | undefined): boolean => {
    const d = new Date(date ?? "");
    return !!date && !isNaN(d.getTime());
  };
  return (
    <List
      dataSource={campaigns}
      renderItem={(row) => {
        const hasVoucher = row?.cmpnOffers?.some((item) => item.isVoucher);
        if (row.cmpnType === "brochure") return null;
        const currDate = new Date();
        const featuredEndDate = isValidDate(row.featuredEndDt)
          ? new Date(row.featuredEndDt!)
          : new Date(0);

        let backgroundColor =
          "linear-gradient(90deg, rgba(227, 227, 227, 0.92) 0%, #FFFFFF 100%)";
        let textColor = "#666666";
        let image = "/icons/neverPromoted.svg";
        let imageHeigth = 40;
        let imageWidth = 60;

        if (featuredEndDate < currDate && row.isFeatured) {
          backgroundColor = "linear-gradient(90deg, #FFDADC 0%, #FFFFFF 100%)";
          textColor = "#ED0C10";
          image = "/icons/expired.svg";
          imageHeigth = 40;
          imageWidth = 70;
        }

        if (featuredEndDate > currDate && row.isFeatured) {
          backgroundColor = "linear-gradient(90deg, #DEECFF 0%, #FFFFFF 100%)";
          textColor = "#257CDB";
          image = "/icons/featured.svg";
          imageHeigth = 20;
          imageWidth = 70;

          const daysDiff = Math.ceil(
            (featuredEndDate.getTime() - currDate.getTime()) /
              (1000 * 3600 * 24)
          );
          if (daysDiff <= 10) {
            backgroundColor =
              "linear-gradient(90deg, #FFFCDE 0%, #FFFFFF 100%)";
            textColor = "#FFC700";
            image = "/icons/expiringsoon.svg";
          }
        }

        const determineStylesAndImage = (
          row: CampaignProps,
          currDate: Date
        ): StaticImageData | string => {
          let image: string = "/icons/grayAuto.svg";

          if (featuredEndDate < currDate && row.isFeatured) {
            image = "/icons/redAuto.svg";
          }

          if (featuredEndDate > currDate && row.isFeatured) {
            const timeDiff = featuredEndDate.getTime() - currDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            image =
              daysDiff <= 10 ? "/icons/yellowAuto.svg" : "/icons/blueAuto.svg";
          }

          return image;
        };

        return (
          <div
            className="flex-between h-36 w-full gap-3 rounded-[9px] border border-secondary-20 p-2 shadow-md"
            style={{ background: backgroundColor }}
          >
            <div className="shrink-0">
              <Image
                alt="offer"
                src={row?.images?.[0]?.img_url || "/images/placeholder.png"}
                className="h-[120px] w-[200px] rounded object-cover"
                height={120}
                width={200}
              />
            </div>

            <div
              className="flex w-[45%] flex-col justify-between gap-2"
              style={{ color: textColor }}
            >
              <div className="flex items-center gap-3">
                <div className="truncate text-[18px] font-semibold">
                  {row.title}
                </div>
                {hasVoucher && (
                  <Image
                    src="/icons/voucherIconBlue.svg"
                    alt="voucher"
                    height={18}
                    width={33}
                  />
                )}
                {row?.paymentSubscription?.status === "ACTIVE" && (
                  <Image
                    src={determineStylesAndImage(row, currDate)}
                    alt="sub-status"
                    height={30}
                    width={70}
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-y-1 text-[14px]">
                <div>
                  Start date:{" "}
                  {new Date(row.startDt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div>Type: {row.cmpnType}</div>
                <div>
                  End date:{" "}
                  {new Date(row.endDt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div>Sold: {row?.cmpnOffers?.[0]?.offerSold || 0}</div>
              </div>
            </div>

            <div className="flex w-[8%] items-center justify-center">
              <Image
                className="object-contain"
                src={image}
                alt="status"
                height={imageHeigth}
                width={imageWidth}
              />
            </div>

            <div className="flex-between w-[30%] flex-col  gap-2">
              {row.isFeatured && (
                <Image
                  alt="featured Logo"
                  src="/icons/featuredLogo.svg"
                  className="h-8 w-32 object-contain"
                  height={32}
                  width={128}
                />
              )}

              <div className="flex flex-col gap-2">
                {new Date().toISOString() < row.endDt &&
                  row.status !== "inactive" && (
                    <button className="flex w-36 items-center justify-center gap-1 rounded-lg bg-blue-600 py-1 text-sm text-white">
                      <span>Promote</span>
                      <Megaphone className="size-[16px]" />
                    </button>
                  )}

                <button className="flex w-36 items-center justify-center gap-1 rounded-lg border border-gray-300 py-1 text-sm text-gray-700">
                  <span>Edit</span>
                  <Pencil className="size-[16px]" />
                </button>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default CampaignList;
