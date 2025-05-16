import { getInvoiceSummary } from "@/actions/transaction.action";

import MonthSlider from "./month-slider";
import SummaryCard from "./summary-card";

type Props = {
  month: string;
  bizid: number;
};
const Summary = async ({ month, bizid }: Props) => {
  const resp = await getInvoiceSummary({
    bizid,
    days: month,
  });

  if (!resp.success || !resp.data) return null;

  return (
    <div className="bg-primary-50 p-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-normal">Total Transaction</div>
        <div className="flex w-full flex-col items-end md:w-[300px]">
          <MonthSlider />
        </div>
      </div>
      <SummaryCard summarydata={resp.data} />
    </div>
  );
};

export default Summary;
