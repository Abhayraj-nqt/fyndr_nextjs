import React from "react";
import { z } from "zod";

import Input from "@/components/global/input";
import { createEventHandlers } from "@/lib/utils/form-generator";

import { DynamicNodeRenderer } from "../dynamic-node-renderer";
import { BaseFieldConfig, BaseFieldProps } from "./types";

export interface FileFieldConfig extends BaseFieldConfig {
  type: "file";
  accept?: string;
  multiple?: boolean;
  validation?: z.ZodAny;
}

type FileFieldProps = BaseFieldProps<FileFieldConfig>;

export const FileField: React.FC<FileFieldProps> = ({
  field,
  register,
  formData,
  setValue,
  shouldDisable,
}) => {
  return (
    <Input
      type="file"
      accept={field.accept}
      multiple={field.multiple}
      disabled={shouldDisable}
      label={field.label}
      showRequired={field.showRequired}
      info={field.info}
      className={field.className}
      inputClassName={field.inputClassName}
      rightNode={
        field.rightNode ? (
          <DynamicNodeRenderer
            node={field.rightNode}
            formData={formData}
            setValue={setValue}
          />
        ) : undefined
      }
      topRightNode={
        field.topRightNode ? (
          <DynamicNodeRenderer
            node={field.topRightNode}
            formData={formData}
            setValue={setValue}
          />
        ) : undefined
      }
      {...(register
        ? register(
            field.name,
            createEventHandlers(field.eventHandlers, formData)
          )
        : {})}
    />
  );
};
