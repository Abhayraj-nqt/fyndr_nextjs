/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

import Input from "@/components/global/input";
import { cn } from "@/lib/utils";

type FormInputProps = React.ComponentProps<"input">;

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    if (type === "password") {
      return (
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("no-focus min-h-12", className)}
          // ref={ref}
          {...props}
          rightNode={
            <div className="mr-2 cursor-pointer" onClick={toggleShowPassword}>
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
          }
        />
      );
    }
    return (
      <Input
        type={type}
        className={cn("no-focus min-h-12", className)}
        // ref={ref}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
