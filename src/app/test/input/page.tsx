import Input from "@/components/global/input";
import React from "react";

const InputTest = () => {
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
    </div>
  );
};

export default InputTest;
