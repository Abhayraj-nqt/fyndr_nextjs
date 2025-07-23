"use client";

import { addDays } from "date-fns";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { ValueLabelProps } from "@/types/global";

import Button from "../buttons";
import DatePicker from "../date-picker";
import Select from "../input/select";

type Props = {
  className?: string;
  appointments: unknown[];
  title: string;
  locations?: ValueLabelProps[];
  defaultLocationId?: string;
};

const SlotBooking = ({
  className,
  appointments = [],
  title = "",
  locations = [],
  defaultLocationId,
}: Props) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedLocationId, setSelectedLocationId] = useState<
    string | undefined
  >(defaultLocationId);

  const getWeekDatesFromToday = (): Date[] => {
    const date = new Date();
    const weekDates: Date[] = [];

    for (let i = 0; i < 7; i++) {
      weekDates.push(addDays(date, i));
    }
    return weekDates;
  };

  const getWeekDay = (date: Date) => {
    const daysOfWeek = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  };

  const formatDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

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
    const month = months[date.getMonth()];
    const day = date.getDate();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    if (date.toDateString() === today.toDateString()) {
      return `${month} ${day} (Today)`;
    }

    if (date.toDateString() === tomorrow.toDateString()) {
      return `${month} ${day} (Tomorrow)`;
    }

    return `${month} ${day} (${dayOfWeek})`;
  };

  const renderSevenDatesFromToday = () => {
    const sevenDates = getWeekDatesFromToday();
    return (
      <>
        {sevenDates.map((date, i) => (
          <Button
            key={i}
            variant="primary-outlined"
            onClick={() => setSelectedDate(date)}
            className={`${selectedDate.toDateString() === date.toDateString() ? "!border-indicator-green-90 !bg-indicator-green-90 !text-white hover:!bg-indicator-green-90 hover:!text-white" : ""}`}
          >
            {formatDate(date)}
          </Button>
        ))}
      </>
    );
  };

  return (
    <div
      className={cn("w-full border border-secondary-20 rounded-10", className)}
    >
      <div className="flex-between p-4">
        <div className="heading-7-medium">{title}</div>
        <Select
          options={locations}
          value={selectedLocationId}
          onValueChange={(locationId) => setSelectedLocationId(locationId)}
          className="max-w-96"
        />
      </div>
      <div className="flex gap-4 border-y border-secondary-20 p-4">
        <div className="flex-center border-r border-secondary-20">
          <DatePicker onChange={() => {}} />
        </div>
        <div className="no-scrollbar flex w-full gap-4 overflow-x-scroll">
          {renderSevenDatesFromToday()}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div>Business Timezone: ${"Time zone"}</div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] place-items-center gap-4">
          {/* list of slots */}
        </div>
      </div>
    </div>
  );
};

export default SlotBooking;
