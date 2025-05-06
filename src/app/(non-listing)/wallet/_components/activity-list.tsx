import { onGetWalletTransactions } from "@/actions/wallet.action";
import { auth } from "@/auth";

import ActivityCard from "./activity-card";

const ActivityList = async () => {
  const session = await auth();

  if (!session || !session.user) return null;

  const { success, data } = await onGetWalletTransactions({
    userId: Number(session.user.id),
    pgSize: 10,
    pgStart: 1,
  });

  if (!success || !data) return null;

  console.log(data);

  return (
    <div className="no-scrollbar max-h-60 overflow-y-scroll">
      {data.walletTransactionsList.map((item, i) => (
        <ActivityCard key={i} transaction={item} />
      ))}
    </div>
  );
};

export default ActivityList;
