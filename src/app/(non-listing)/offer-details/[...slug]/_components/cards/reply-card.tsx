import React from "react";

// import { getTimeStamp } from "@/lib/utils/date";

import Metric from "../sections/rating-and-reviews-section/metric";

type Props = {
  name: string;
  reply: string;
  imgUrl: string;
  createdAt: string;
};

const ReplyCard = ({ imgUrl, reply, createdAt, name }: Props) => {
  const data = new Date(createdAt);
  const formattedDate = data.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      key={createdAt}
      className="flex flex-col gap-4 rounded-10 bg-white p-4"
    >
      <div className="w-fit">
        <Metric
          imgUrl={imgUrl}
          alt={`${createdAt}`}
          value={name}
          // title={`• ${getTimeStamp(new Date(createdAt))}`}
          title={`• ${formattedDate}`}
          textStyles="body-3-medium"
        />
      </div>
      <div className="text-black-60">{reply}</div>
    </div>
  );
};

export default ReplyCard;
