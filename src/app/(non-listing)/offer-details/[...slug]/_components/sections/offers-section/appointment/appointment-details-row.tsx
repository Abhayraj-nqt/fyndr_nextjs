import { PencilLine } from "lucide-react";

import { CurrencySymbol } from "@/types/global";

const formatTime = (timeStr: string) => {
  const [hour, minute] = timeStr.split(":");
  const date = new Date();
  date.setHours(Number(hour), Number(minute));
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export type AppointmentDetailsRowProps = {
  startTime: string;
  endTime: string;
  date: Date;
  qty: number;
  amount: number;
  currencySymbol: CurrencySymbol;
  offerName: string;
  type: "regular" | "scheduledLater";
  onEdit: () => void;
};

export const AppointmentDetailsRow = ({
  startTime,
  endTime,
  amount,
  date,
  qty,
  currencySymbol,
  onEdit,
  offerName,
}: AppointmentDetailsRowProps) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${months[date.getMonth()]} ${date.getDate()}`;
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  const displayString = `${formattedDate} (${dayName}) ${formattedStartTime} - ${formattedEndTime}`;
  const isScheduledForLater = !startTime.length || !endTime.length;

  return (
    <div
      className={`flex w-full flex-col ${isScheduledForLater ? "rounded-10 border border-secondary-20 p-4" : ""}`}
    >
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          {isScheduledForLater ? offerName : displayString}
        </div>
        <div className="flex-center w-16 rounded-5 border border-secondary-20 px-2 py-1">
          {qty}
        </div>
        <div className="flex min-w-6 items-center justify-end gap-2">
          <div>
            {currencySymbol}
            {amount}{" "}
          </div>
          {!isScheduledForLater ? (
            <PencilLine size={16} className="cursor-pointer" onClick={onEdit} />
          ) : (
            <></>
          )}
        </div>
      </div>
      {isScheduledForLater ? (
        <div className="body-3 w-fit rounded-5  bg-secondary-10 px-2 py-1 text-black-70">
          Schedule later
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
