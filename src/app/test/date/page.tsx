"use client";

import React, { useState } from "react";

import { DatePicker } from "@/components/global/date-and-time/date-picker";

const DatePage = () => {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="flex-center min-h-screen">
      <DatePicker date={date} onDateChange={setDate} />
    </div>
  );
};

export default DatePage;
