import { ReplyDarkUIconSVG, ReplyUIconSVG } from "@/utils/SVGs/SVGs";
import React from "react";

interface ReplyComponentProps {
  isOpenReplyModel: boolean;
  replyId: string | null;
  dataId: string;
  onReplyClick: (id: string) => void;
}

const ReplyComponent: React.FC<ReplyComponentProps> = ({
  isOpenReplyModel,
  replyId,
  dataId,
  onReplyClick,
}) => {
  return (
    <div
      className="text-[0.8rem] border-r-2 pr-2 border-gray-200 flex gap-2 mt-1 items-center cursor-pointer"
      onClick={() => onReplyClick(dataId)}
    >
      <span
        className={`${
          isOpenReplyModel && replyId === dataId
            ? "text-[#3a5894] font-bold"
            : ""
        }`}
      >
        Reply
      </span>
      {isOpenReplyModel && replyId === dataId ? (
        <ReplyDarkUIconSVG />
      ) : (
        <ReplyUIconSVG />
      )}
    </div>
  );
};

export default ReplyComponent;
