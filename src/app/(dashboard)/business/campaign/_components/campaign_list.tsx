"use client";
import { CampaignProps } from "@/types/campaign";
import List from "./list";
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
        let imageHeigth = "70%";
        let imageWidth = "90%";

        if (featuredEndDate < currDate && row.isFeatured) {
          backgroundColor = "linear-gradient(90deg, #FFDADC 0%, #FFFFFF 100%)";
          textColor = "#ED0C10";
          image = "/icons/expired.svg";
          imageHeigth = "80%";
          imageWidth = "50%";
        }

        if (featuredEndDate > currDate && row.isFeatured) {
          backgroundColor = "linear-gradient(90deg, #DEECFF 0%, #FFFFFF 100%)";
          textColor = "#257CDB";
          image = "/icons/featured.svg";
          imageHeigth = "80%";
          imageWidth = "100%";

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

        return (
          <div
            className="flex-between w-full border border-[#d3d6e1] rounded-[9px] shadow-md px-2 py-2 gap-3 h-36"
            style={{ background: backgroundColor }}
          >
            <div className="flex-shrink-0">
              <img
                alt=""
                src={row?.images?.[0]?.img_url || ""}
                className="w-[200px] h-[100px] object-cover rounded"
              />
            </div>

            <div
              className="w-[45%] flex flex-col justify-between gap-2"
              style={{ color: textColor }}
            >
              <div className="flex items-center gap-3">
                <div className="font-semibold text-[18px] truncate">
                  {row.title}
                </div>
                {hasVoucher && (
                  <img
                    // src={voucherIcon}
                    alt="voucher"
                    className="w-[33px] h-[18px]"
                  />
                )}
                {row?.paymentSubscription?.status === "ACTIVE" && (
                  <img
                    // src={determineStylesAndImage(row, currDate)}
                    alt="sub-status"
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

            <div className="w-[8%] flex items-center justify-center">
              <img
                className="object-contain"
                style={{ height: imageHeigth, width: imageWidth }}
                src={image}
                alt="status"
              />
            </div>

            <div className="w-[30%] flex-between flex-col  gap-2">
              {row.isFeatured && (
                <img
                  alt="featured Logo"
                  src="/icons/featuredLogo.svg"
                  className="h-8 w-32 object-contain"
                />
              )}

              <div className="flex flex-col gap-2">
                {new Date().toISOString() < row.endDt &&
                  row.status !== "inactive" && (
                    <button className="w-36 py-1 rounded-lg bg-blue-600 text-white flex items-center justify-center gap-1 text-sm">
                      <span>Promote</span>
                      {/* <GrAnnounce className="mt-[2px]" /> */}
                    </button>
                  )}

                <button className="w-36 py-1 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center gap-1 text-sm">
                  <span>Edit</span>
                  {/* <AiOutlineEdit className="mt-[2px]" /> */}
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
