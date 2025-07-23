import React, { Suspense } from "react";

import { Modal } from "@/components/global/modal";
import { Campaign } from "@/types/campaign/campaign.types";

import Comments from "./sections/rating-and-reviews-section/comments";

type Props = {
  trigger: React.ReactNode;
  business: Campaign["biz"];
  page: number;
  qrCode: string;
};

const AllReviewsModal = ({ trigger, business, page = 1, qrCode }: Props) => {
  return (
    <Modal
      trigger={trigger}
      title={<div>All Reviews</div>}
      closeOnOutsideClick={false}
      width="820px"
      bodyClassName="max-h-[80vh] overflow-y-scroll no-scrollbar"
    >
      <Suspense fallback={"Loading..."}>
        <Comments
          business={business}
          orderBy={"DESC"}
          sortBy={"CREATED_DT"}
          enablePagination
          page={page}
          qrCode={qrCode}
        />
      </Suspense>
    </Modal>
  );
};

export default AllReviewsModal;
