export type RefundDisputeResponse = {
  success: boolean;
  message: string;
};
export type DisputeCommentsListResponse = [
  {
    userName: string;
    date: string;
    comment: string;
    userEntity: string;
  },
];
export type DisputeComment = {
  message: string;
};
