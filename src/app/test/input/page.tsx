"use client";

import { UserIcon, SettingsIcon, Facebook } from "lucide-react";
import React, { useState } from "react";

import Button from "@/components/global/buttons";
import Input from "@/components/global/input";
import NewSelect from "@/components/global/input/select/index";
import Switch from "@/components/global/input/switch";
import toast from "@/components/global/toast";
import { Label } from "@/components/ui/label";

// import NewSelect from "./_components/select/select";

const InputTest = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [checked, setChecked] = useState(false);

  console.log({ selectedValue, selectedValues });

  const options = [
    { value: "option1", label: "Option 1", icon: <UserIcon /> },
    { value: "option2", label: "Option 2", icon: <SettingsIcon /> },
    { value: "option3", label: "Option 3", disabled: true, icon: <Facebook /> },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col gap-10 p-4">
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-medium">Input</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex w-full flex-col gap-2">
            <Label className="text-black-70">Email: </Label>
            <Input placeholder="Enter your email" disabled />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label className="text-black-70">Email: </Label>
            <Input placeholder="Enter your email" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Enter your email"
            label="Email"
            showRequired
            info={"Hello"}
            disabled
          />

          <Input
            placeholder="Enter your email"
            label="Email"
            showRequired
            info={"Hello"}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Enter your email"
            label="Email"
            rightNode={
              <Button
                onClick={() => toast.success({ message: "Verified" })}
                variant="primary"
              >
                Verify
              </Button>
            }
          />
          <Input
            placeholder="Enter your email"
            label="Email"
            topRightNode={
              <Switch
                checkedTitle="Checked"
                uncheckedTitle="Unchecked"
                checked={checked}
                onCheckedChange={setChecked}
              />
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-medium">Select</h2>
        <div className="grid grid-cols-2 gap-4">
          <NewSelect
            label="Options"
            showRequired
            info="Hello"
            options={options}
            onValueChange={setSelectedValue}
          />
          <NewSelect  options={options} onValueChange={setSelectedValue} />
          <NewSelect
            options={options}
            onValueChange={setSelectedValue}
            searchable
          />
          <NewSelect
            options={options}
            onValueChange={setSelectedValues}
            multi
            // disabled
          />
          <NewSelect
            options={options}
            onValueChange={setSelectedValues}
            searchable
            multi
          />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-medium">Switch</h2>
        <div className="flex items-center gap-4">
          <Switch
            checkedTitle="Pro"
            uncheckedTitle="Free"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Switch
            checkedTitle="Pro 123"
            uncheckedTitle="Free 456"
            disabled
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Switch checked={checked} onCheckedChange={setChecked} />
          <Switch checked={checked} disabled />
        </div>
      </div>
    </div>
  );
};

export default InputTest;
