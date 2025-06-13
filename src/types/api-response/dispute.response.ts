export type DisputeDetailsProps = {
  invoiceId: number;
  disputeId: number;
  buyerEmail: string;
  disputeReason: string;
  amount: number;
  disputeStatus: string;
  paymentId: number;
  images: [
    {
      img_url: string;
      thumbnail_url: string;
      order: number;
    },
  ];
  createDate: string;
};
export type DisputeListResponse = {
  last: boolean;
  disputeDetails: DisputeDetailsProps[];
  count: number;
};
