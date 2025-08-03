"use client";

import { Flag, MessageCircleMore } from "lucide-react";

import Button from "@/components/global/buttons";
import { useUser } from "@/hooks/auth";
import { Comment } from "@/types/business/business.types";
import { Campaign } from "@/types/campaign/campaign.types";

import ReplyModal from "./reply-modal";
import ReportModal from "./report-modal";

type Props = {
  business: Campaign["biz"];
  comment: Comment;
  qrCode: string;
};

const ReplyReportSection = ({ business, comment, qrCode }: Props) => {
  const { isLoading, user } = useUser();
  if (isLoading || !user || !business.bizid) return null;
  if (business.bizid !== user.bizid) return null;

  return (
    <div className="flex-between gap-4">
      <ReplyModal
        trigger={
          <Button variant="primary-outlined" stdHeight stdWidth>
            Reply <MessageCircleMore size={20} className="size-5" />
          </Button>
        }
        comment={comment}
        bizId={business.bizid}
        bizLogo={business.mainLogo}
        bizName={business.bizName}
        qrCode={qrCode}
      />
      {comment.isReportingAllowed ? (
        <ReportModal
          trigger={
            <Button variant="primary-outlined" stdHeight stdWidth>
              Report <Flag size={20} className="size-5" />
            </Button>
          }
          comment={comment}
          bizId={business.bizid}
          bizName={business.bizName}
          qrCode={qrCode}
        />
      ) : (
        <Button variant="primary-outlined" stdHeight stdWidth disabled>
          Report <Flag size={20} className="size-5" />
        </Button>
      )}
    </div>
  );
};

export default ReplyReportSection;
