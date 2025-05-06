import { Input } from "@/components/ui/input";
import TransactionSlider from "./months-slider";
import ReceivableDropdown from "./receivableDropdown";
import TransactionInput from "./transaction-input";

type Props = {
  type: "receivable" | "payable";
};

const CommonHeader = ({ type }: Props) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 mt-4">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <TransactionInput />
          </div>
        </div>
        <div className="flex flex-col items-end w-full md:w-[300px]">
          <TransactionSlider />
        </div>
        {type === "receivable" && (
          <div>
            <ReceivableDropdown />
          </div>
        )}
      </div>
      <hr className="border-black-200 mb-2" />
      <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-gray-600 mb-3">
        <div className="text-left">
          {type === "receivable" ? "Username" : "Offer Name"}
        </div>
        <div className="text-center">Date</div>
        <div className="text-right">Amount</div>
      </div>
    </>
  );
};

export default CommonHeader;
