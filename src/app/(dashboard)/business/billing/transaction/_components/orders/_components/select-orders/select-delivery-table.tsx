"use client";

import Select from '@/components/global/input/select/index';
import React, { useState } from 'react'


type SelectDeliveryTableProps = {
  data : string;
}

const SelectDeliveryTable = ({data}:SelectDeliveryTableProps) => {
    
  console.log(data, "data");
  console.log(typeof data ,"type");
     const [selectedValue, setSelectedValue] = useState<string>(data);
      const getDeliveryColor = (data:string) => {
        switch (data) {
            case "READY_TO_PICK":
                return "#E2FFE5";
            case "NA":
                return "#EAEAEA";
            case "FULFILLED":
                return "#E2FFE5";
            case "PROCESSING":
                return "#f3f3ba";
            default:
                return null;
        }
    };
      const deliveryType = [
        { value: "PROCESSING", label: "Processing" },
        { value: "READY_TO_PICK", label: "Ready To Pick" },
        { value: "FULFILLED", label: "Fulfilled" },
    ];
      const options =
    data === "NA" && !deliveryType.some((opt) => opt.value === "NA")
      ? [{ value: "NA", label: "NA" }, ...deliveryType]
      : deliveryType;

    const handleChange = (value: string) => {
               
    };
  return (
    <Select
      options={options}
      value={selectedValue}
      onValueChange={setSelectedValue}
   
       inputClassName='!bg-red-500 !rounded-full'
     className="w-36 rounded-full !bg-red-500 "
   />
  )
}

export default SelectDeliveryTable