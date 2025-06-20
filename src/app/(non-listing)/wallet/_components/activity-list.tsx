import { onGetWalletTransactions } from "@/actions/wallet.action";
import { auth } from "@/auth";
import DataRenderer from "@/components/global/data-renderer";
import Pagination from "@/components/global/pagination";
import { EMPTY_WALLET_TRANSACTIONS } from "@/constants/states";

import ActivityCard from "./activity-card";

type Props = {
  page: number;
  size: number;
};

const ActivityList = async ({ page = 1, size = 10 }: Props) => {
  const session = await auth();

  if (!session || !session.user) return null;

  const { success, data, error } = await onGetWalletTransactions({
    params: {
      userId: Number(session.user.id),
      pgSize: size,
      pgStart: page,
    },
  });

  if (!success || !data) return null;

  return (
    <>
      <div className="rounded-lg bg-white px-4">
        <DataRenderer
          success={success}
          error={error}
          data={data.walletTransactionsList}
          empty={EMPTY_WALLET_TRANSACTIONS}
          render={(transactions) => (
            <div className="no-scrollbar flex w-full  flex-col gap-6 overflow-y-scroll pt-4">
              {transactions.map((transaction, i) => (
                <ActivityCard
                  key={`${transaction.transactionDt}-${i}`}
                  transaction={transaction}
                />
              ))}
            </div>
          )}
        />
      </div>
      {data.walletTransactionsList.length > 0 ? (
        <Pagination
          page={page}
          pageSize={size}
          isLast={data.last}
          count={data.count}
          scroll={false}
          className="mt-2 rounded-b-lg p-6 shadow-pagination"
          showRowSelector={false}
        />
      ) : (
        <div className="rounded-b-lg py-8"></div>
      )}
    </>
  );
};

export default ActivityList;
