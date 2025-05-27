import InputWrapper from "@/components/global/input/input-wrapper";
import { Input } from "@/components/ui/input";
import React from "react";

const InputTest = () => {
  return (
    <div className="min-h-screen flex-center gap-4">
      <h1>Input</h1>
      <div className="flex gap-4">
        <InputWrapper label="Email" disabled showRequired info={"Hello"}>
          <Input
            placeholder="Enter your email"
            disabled
            className="input-primary"
          />
        </InputWrapper>
        <InputWrapper disabled>
          <Input
            placeholder="Enter your email"
            disabled
            className="input-primary"
          />
        </InputWrapper>
      </div>
      <div className="flex gap-4">
        <InputWrapper label="Email" showRequired>
          <Input placeholder="Enter your email" className="input-primary" />
        </InputWrapper>
        <InputWrapper>
          <Input placeholder="Enter your email" className="input-primary" />
        </InputWrapper>
      </div>
    </div>
  );
};

export default InputTest;
