import { onGetWalletTransactions } from "@/actions/wallet.action";
import { auth } from "@/auth";
import DataRenderer from "@/components/global/data-renderer";
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ROUTES from "@/constants/routes";
import { EMPTY_WALLET_TRANSACTIONS } from "@/constants/states";

import ActivityCard from "./activity-card";

type Props = {
  page: number;
};

const ActivityList = async ({ page = 1 }: Props) => {
  const session = await auth();

  if (!session || !session.user) return null;

  const { success, data, error } = await onGetWalletTransactions({
    userId: Number(session.user.id),
    pgSize: 10,
    pgStart: page,
  });

  if (!success || !data) return null;

  return (
    <div>
      <DataRenderer
        success={success}
        error={error}
        data={data.walletTransactionsList}
        empty={EMPTY_WALLET_TRANSACTIONS}
        render={(transactions) => (
          <div className="no-scrollbar mt-10 flex  w-full flex-col gap-6 overflow-y-scroll">
            {transactions.map((transaction, i) => (
              <ActivityCard
                key={`${transaction.transactionDt}-${i}`}
                transaction={transaction}
              />
            ))}
          </div>
        )}
      />
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              scroll={false}
              href={`${ROUTES.WALLET}?page=${page - 1 > 0 ? page - 1 : 1}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink scroll={false} href="#">
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              scroll={false}
              href={`${ROUTES.WALLET}?page=${data.last ? page : page + 1}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ActivityList;
