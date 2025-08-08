import React, { Suspense } from "react";

import { Modal } from "@/components/global/modal";
import Comments from "@/components/global/rating-and-reviews/business/comment/comments";

import { ReviewBusinessProps } from "./business-ratings-and-reviews";

type Props = {
  trigger: React.ReactNode;
  business: ReviewBusinessProps;
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
