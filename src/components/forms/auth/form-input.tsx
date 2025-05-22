import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface FormInputProps extends React.ComponentProps<"input"> {}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <Input
        type={type}
        className={cn(
          "paragraph-regular no-focus min-h-12 rounded-[10px] border bg-light-900 text-dark-100",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
