import React from "react";

import { Modal } from "@/components/global/modal";

type Props = {
  trigger: React.ReactNode;
  workingHours: BusinessWorkingHourProps;
};

const WorkingHourModal = ({ trigger, workingHours }: Props) => {
  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const renderTimeSlots = (timeSlots: string[] | undefined) => {
    if (!timeSlots || timeSlots.length === 0) {
      return <p>Closed</p>;
    }

    return (
      <div className="flex flex-col gap-2">
        {timeSlots.map((slot, i) => (
          <p key={i}>{formatSlot(slot)}</p>
        ))}
      </div>
    );
  };

  const formatSlot = (slot: string) => {
    const [startTime, endTime] = slot.split("-");
    return `${formatTime(startTime)} to ${formatTime(endTime)}`;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <Modal
      title={"Working Hours"}
      trigger={trigger}
      bodyClassName="max-h-[85vh] overflow-y-scroll no-scrollbar"
    >
      <div className="space-y-3">
        {dayOrder.map((day) => {
          const dayKey = day as keyof BusinessWorkingHourProps;
          const timeSlots = workingHours[dayKey];

          return (
            <div
              key={day}
              className="flex flex-col gap-2 border-b border-secondary-20 py-2 pb-4 last:border-b-0"
            >
              <span className="body-1-medium text-black-70">{day}</span>
              <span className="body-1 text-black-60">
                {renderTimeSlots(timeSlots)}
              </span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default WorkingHourModal;
