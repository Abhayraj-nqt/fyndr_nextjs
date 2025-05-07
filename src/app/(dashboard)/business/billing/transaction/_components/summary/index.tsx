import SummaryCard from "./summary-card";
import MonthSlider from "./month-slider";
import { getInvoiceSummary } from "@/actions/transaction.action";

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
      <div className="flex justify-between items-center">
        <div className="text-lg font-normal">Total Transaction</div>
        <div className="flex flex-col items-end w-full md:w-[300px]">
          <MonthSlider />
        </div>
      </div>
      <SummaryCard summarydata={resp.data} />
    </div>
  );
};

export default Summary;
