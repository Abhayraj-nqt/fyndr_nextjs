import React from "react";

type Props = {
  transaction: WalletTransactionsProps;
};

const ActivityCard = ({ transaction }: Props) => {
  return <div>{transaction.businessName}</div>;
};

export default ActivityCard;
