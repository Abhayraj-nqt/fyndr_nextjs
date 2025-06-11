"use client";
import React, { useEffect, useState } from "react";

import {
  onDisputeComment,
  onDisputeCommentList,
} from "@/actions/dispute.action";
import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/auth";
import { DisputeDetailsProps } from "@/types/api-response/dispute.response";
import { DisputeCommentsListResponse } from "@/types/api-response/refundDispute.response";

interface DisputeRefundProps {
  row: DisputeDetailsProps | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const DisputeCommentList = ({
  row,
  onOpenChange,
  open,
}: DisputeRefundProps) => {
  const { isLoading, user, error } = useUser();

  const [disputeList, setDisputeList] =
    React.useState<DisputeCommentsListResponse>([]);
  const [textArea, setTextArea] = useState<string>("");

  useEffect(() => {
    if (open && row?.disputeId) {
      getDisputeList();
    }
  }, [open, row]);
  const getDisputeList = async () => {
    const data = await onDisputeCommentList({ disputeId: row!.disputeId });
    if (data?.data) {
      setDisputeList(data.data);
    }
  };

  const handleSubmit = async () => {
    if (!textArea.trim()) {
      alert("Please enter a comment");
      return;
    }

    const comment = await onDisputeComment({
      disputeId: row?.disputeId,
      userId: user?.indvid,
      comment: textArea,
    });

    if (comment) {
      setTextArea("");
      await getDisputeList();

      // alert("Comment submitted successfully");
      toast.success({ message: "Comment submitted successfully" });
    } else {
      alert("Failed to submit comment");
    }
  };

  return (
    <div>
      <Modal
        onOpenChange={onOpenChange}
        open={open}
        title={`Dispute ${row?.disputeId}`}
      >
        <div className="space-y-6 p-5">
          {disputeList?.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-blue-300 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-800">
                  {item.userName}{" "}
                  <span className="font-medium text-blue-500">
                    (
                    {item.userEntity.charAt(0).toUpperCase() +
                      item.userEntity.slice(1).toLowerCase()}
                    )
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>

              <div className="my-2 border-t border-blue-200"></div>

              <div className="text-sm text-gray-700">{item.comment}</div>
            </div>
          ))}
          <div>
            <Textarea
              rows={4}
              placeholder="Write your message here..."
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
            ></Textarea>
          </div>
          <div className="flex justify-center">
            <Button className="bg-[#1890ff]" onClick={handleSubmit}>
              Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DisputeCommentList;
