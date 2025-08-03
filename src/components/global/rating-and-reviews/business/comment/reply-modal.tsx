"use client";

import React, { useState, useTransition } from "react";

import { onReplyToComment } from "@/actions/business.action";
import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import Stars from "@/components/global/ratings/stars";
import toast from "@/components/global/toast";
import { Textarea } from "@/components/ui/textarea";
// import { getTimeStamp } from "@/lib/utils/date";
import ROUTES from "@/constants/routes";
import { Comment } from "@/types/business/business.types";

import Metric from "./metric";
import ReplyCard from "./reply-card";

type Props = {
  trigger: React.ReactNode;
  comment: Comment;
  bizId: number;
  bizName: string;
  qrCode: string;
  bizLogo: string;
};

const ReplyModal = ({
  trigger,
  comment,
  bizId,
  bizLogo,
  bizName,
  qrCode,
}: Props) => {
  const [reply, setReply] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [submitting, startSubmitting] = useTransition();

  const closeModal = () => setModalOpen(false);

  const handleReply = async () => {
    startSubmitting(async () => {
      if (reply.length < 1) {
        toast.error({
          message: "Please enter your reply",
        });
        return;
      }
      const { success, data, error } = await onReplyToComment({
        params: {
          commentId: comment.commentId,
        },
        payload: {
          businessId: bizId,
          reply,
        },
        options: {
          validatePath: ROUTES.OFFER_DETAILS(bizName, qrCode),
        },
      });

      console.log({ success, data, error });

      if (!success) {
        toast.error({
          message: error?.details?.message || "Failed to reply",
        });
        return;
      }

      if (data) {
        toast.success({
          message: data.message,
        });
        setReply("");
        closeModal();
      }
    });
  };

  const data = new Date(comment.createdDt);
  const formattedDate = data.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Modal
      open={modalOpen}
      onOpenChange={setModalOpen}
      trigger={trigger}
      title={<div>Reply to the comment</div>}
      bodyClassName="flex flex-col gap-4"
    >
      <div className="flex w-fit flex-col gap-2">
        <Metric
          name={`${comment.user.firstName} ${comment.user.lastName}`}
          alt={`${comment.commentId}`}
          value={`${comment.user.firstName} ${comment.user.lastName}`}
          // title={`• ${getTimeStamp(new Date(comment.createdDt))}`}
          title={`• ${formattedDate}`}
          textStyles="body-medium"
        />
        <Stars outOf={5} ratings={comment.rating} />
      </div>
      <div className="body-1 flex flex-col gap-4 rounded-10 bg-primary-10 p-4 text-black-70">
        <div>{comment.review}</div>
        {comment.commentThread && comment.commentThread.length > 0 && (
          <div className="no-scrollbar flex max-h-56 flex-col gap-4 overflow-y-scroll">
            {comment.commentThread.map((item) => (
              <ReplyCard
                key={item.createdDt}
                name={bizName}
                imgUrl={bizLogo}
                reply={item.reply}
                createdAt={item.createdDt}
              />
            ))}
          </div>
        )}
      </div>
      <Textarea
        rows={5}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write your comment"
        className="no-focus placeholder max-h-32 !border !border-secondary-20 shadow-none"
      />

      <Button
        variant="primary"
        stdHeight
        stdWidth
        onClick={handleReply}
        className="mt-4"
        disabled={submitting}
      >
        {submitting ? "Submitting" : "Submit"}
      </Button>
    </Modal>
  );
};

export default ReplyModal;
