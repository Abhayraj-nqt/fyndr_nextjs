import React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormInputProps = React.ComponentProps<"input">;

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <Input
        type={type}
        className={cn(
          "paragraph-regular no-focus min-h-12 rounded-[10px] border bg-white text-black",
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
