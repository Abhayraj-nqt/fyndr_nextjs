import { useState } from "react";

import DefaultCard from "@/components/global/cards/default-card";
import DatePicker from "@/components/global/date-picker";
import CustomEditor from "@/components/global/editor/customEditor";
import Input from "@/components/global/input";
import InputWrapper from "@/components/global/input/input-wrapper";

const DescriptionForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  return (
    <>
      <DefaultCard className="m-4 w-full max-w-[772px] flex-col border-solid bg-white p-[23px] outline-black">
        <div className="flex flex-col gap-6">
          <div className="flex">
            <Input label="Title" showRequired />
          </div>
          <div className="flex flex-row gap-6">
            <InputWrapper label="Start Date" showRequired>
              {
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  placeholder="Select Start Date"
                  className="w-full border-none bg-white shadow-none hover:bg-white"
                />
              }
            </InputWrapper>
            <InputWrapper label="End Date" showRequired>
              {
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  placeholder="Select End Date"
                  className="w-full border-none bg-white shadow-none hover:bg-white"
                />
              }
            </InputWrapper>
          </div>
          <div className="flex">
            <CustomEditor />
          </div>
        </div>
      </DefaultCard>
    </>
  );
};

export default DescriptionForm;
