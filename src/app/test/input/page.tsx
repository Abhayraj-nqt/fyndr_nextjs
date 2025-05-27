"use client";

import Input from "@/components/global/input";
import Select from "@/components/global/input/select";
import React, { useEffect, useState } from "react";

const InputTest = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3", disabled: true },
  ];

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  return (
    <div className="min-h-screen flex-center gap-4">
      <h1>Input</h1>
      <div className="flex gap-4">
        <Input
          placeholder="Enter your email"
          label="Email"
          showRequired
          info={"Hello"}
          disabled
        />
        <Input placeholder="Enter your email" disabled />
      </div>
      <div className="flex gap-4">
        <Input
          placeholder="Enter your email"
          label="Email"
          showRequired
          info={"Hello"}
        />
        <Input placeholder="Enter your email" />
      </div>

      <Select
        label="Choose an option"
        placeholder="Select something"
        options={options}
        value={selectedValue}
        onValueChange={setSelectedValue}
        showRequired
        info="This is additional info"
      />
    </div>
  );
};

export default InputTest;
