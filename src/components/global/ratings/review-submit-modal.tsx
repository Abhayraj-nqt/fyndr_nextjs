import React from "react";

import { Modal } from "../modal";

type Props = {
  trigger?: React.ReactNode;
  title?: string;
};

const ReviewSubmitModal = ({ title, trigger }: Props) => {
  return (
    <div>
      <Modal trigger={trigger} title={title || "Ratings & Reviews"}>
        Hello
      </Modal>
    </div>
  );
};

export default ReviewSubmitModal;
