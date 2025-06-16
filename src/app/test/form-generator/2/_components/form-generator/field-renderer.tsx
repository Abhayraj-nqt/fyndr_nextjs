/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */
"use client";
import React, { useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
  Controller,
} from "react-hook-form";

import Input from "@/components/global/input";
import Select from "@/components/global/input/select/index";
import Switch from "@/components/global/input/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { DynamicNodeRenderer } from "./dynamic-node-renderer";
import { FormFieldConfig } from "../../types/form.generator";

interface FieldRendererProps {
  field: FormFieldConfig;
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  className?: string;
  setValue: any;
  getValues: any;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  control,
  register,
  errors,
  className,
  setValue,
  getValues,
}) => {
  // Watch form data for conditional behavior and dynamic nodes
  const formData = useWatch({ control });

  // Evaluate conditional behavior
  const shouldHide = field.conditionalBehavior?.some(
    (behavior) =>
      behavior.effect === "hide" &&
      behavior.condition(formData[behavior.dependsOn], formData)
  );

  const shouldDisable =
    field.disabled ||
    field.conditionalBehavior?.some(
      (behavior) =>
        behavior.effect === "disable" &&
        behavior.condition(formData[behavior.dependsOn], formData)
    );

  if (shouldHide) {
    return null;
  }

  // Enhanced event handlers
  const createEventHandlers = (baseHandlers: any = {}) => ({
    ...baseHandlers,
    onBlur: (event: React.FocusEvent) => {
      baseHandlers.onBlur?.(event);
      field.eventHandlers?.onBlur?.(event, formData);
    },
    onFocus: (event: React.FocusEvent) => {
      baseHandlers.onFocus?.(event);
      field.eventHandlers?.onFocus?.(event, formData);
    },
    onChange: (value: any) => {
      baseHandlers.onChange?.(value);
      field.eventHandlers?.onChange?.(value, formData);
    },
  });

  const renderField = () => {
    switch (field.type) {
      case "input": {
        const inputField = field as Extract<FormFieldConfig, { type: "input" }>;
        return (
          <Input
            type={inputField.inputType || "text"}
            placeholder={field.placeholder}
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
            {...register(field.name, {
              ...createEventHandlers(),
            })}
          />
        );
      }

      case "textarea": {
        const textareaField = field as Extract<
          FormFieldConfig,
          { type: "textarea" }
        >;
        return (
          <div className={cn("space-y-2", field.className)}>
            {field.label && (
              <Label htmlFor={field.name} className="flex items-center gap-2">
                {field.label}
                {field.showRequired && <span className="text-red-600">*</span>}
                {field.info}
              </Label>
            )}
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              disabled={shouldDisable}
              rows={textareaField.rows}
              className={field.inputClassName}
              {...register(field.name, createEventHandlers())}
            />
          </div>
        );
      }

      case "select": {
        const selectField = field as Extract<
          FormFieldConfig,
          { type: "select" }
        >;

        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <Select
                label={field.label}
                placeholder={field.placeholder}
                disabled={shouldDisable}
                showRequired={field.showRequired}
                info={field.info}
                className={field.className}
                inputClassName={field.inputClassName}
                iconClassName={selectField.iconClassName}
                options={selectField.options}
                searchable={selectField.searchable}
                searchPlaceholder={selectField.searchPlaceholder}
                noOptionsText={selectField.noOptionsText}
                value={controllerField.value}
                onValueChange={(value) => {
                  controllerField.onChange(value);
                  field.eventHandlers?.onChange?.(value, formData);
                }}
                name={field.name}
              />
            )}
          />
        );
      }

      case "multiselect": {
        const multiselectField = field as Extract<
          FormFieldConfig,
          { type: "multiselect" }
        >;
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <Select
                label={field.label}
                placeholder={field.placeholder}
                disabled={shouldDisable}
                showRequired={field.showRequired}
                info={field.info}
                className={field.className}
                inputClassName={field.inputClassName}
                options={multiselectField.options}
                searchable={multiselectField.searchable}
                searchPlaceholder={multiselectField.searchPlaceholder}
                noOptionsText={multiselectField.noOptionsText}
                maxSelectedDisplay={multiselectField.maxSelectedDisplay}
                multi={true}
                value={controllerField.value}
                onValueChange={(value) => {
                  controllerField.onChange(value);
                  field.eventHandlers?.onChange?.(value, formData);
                }}
                name={field.name}
              />
            )}
          />
        );
      }

      case "checkbox": {
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <div
                className={cn("flex items-center space-x-2", field.className)}
              >
                <Checkbox
                  id={field.name}
                  checked={controllerField.value}
                  onCheckedChange={(checked) => {
                    controllerField.onChange(checked);
                    field.eventHandlers?.onChange?.(checked, formData);
                  }}
                  disabled={shouldDisable}
                />
                {field.label && (
                  <Label
                    htmlFor={field.name}
                    className="flex items-center gap-2"
                  >
                    {field.label}
                    {field.showRequired && (
                      <span className="text-red-600">*</span>
                    )}
                    {field.info}
                  </Label>
                )}
              </div>
            )}
          />
        );
      }

      case "radio": {
        const radioField = field as Extract<FormFieldConfig, { type: "radio" }>;
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <div className={cn("space-y-3", field.className)}>
                {field.label && (
                  <Label className="flex items-center gap-2">
                    {field.label}
                    {field.showRequired && (
                      <span className="text-red-600">*</span>
                    )}
                    {field.info}
                  </Label>
                )}
                <RadioGroup
                  value={controllerField.value}
                  onValueChange={(value) => {
                    controllerField.onChange(value);
                    field.eventHandlers?.onChange?.(value, formData);
                  }}
                  disabled={shouldDisable}
                >
                  {radioField.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          />
        );
      }

      case "switch": {
        const switchField = field as Extract<
          FormFieldConfig,
          { type: "switch" }
        >;
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <div
                className={cn(
                  "flex items-center justify-between",
                  field.className
                )}
              >
                {field.label && (
                  <Label
                    htmlFor={field.name}
                    className="flex items-center gap-2"
                  >
                    {field.label}
                    {field.showRequired && (
                      <span className="text-red-600">*</span>
                    )}
                    {field.info}
                  </Label>
                )}
                <Switch
                  id={field.name}
                  checked={controllerField.value}
                  onCheckedChange={(checked) => {
                    controllerField.onChange(checked);
                    field.eventHandlers?.onChange?.(checked, formData);
                  }}
                  disabled={shouldDisable}
                  checkedTitle={switchField.checkedTitle}
                  uncheckedTitle={switchField.uncheckedTitle}
                  titleClassName={switchField.titleClassName}
                  thumbClassName={switchField.thumbClassName}
                  checkedTitleClassName={switchField.checkedTitleClassName}
                  uncheckedTitleClassName={switchField.uncheckedTitleClassName}
                />
              </div>
            )}
          />
        );
      }

      case "date": {
        return (
          <Input
            type="date"
            placeholder={field.placeholder}
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
            {...register(field.name, createEventHandlers())}
          />
        );
      }

      case "file": {
        const fileField = field as Extract<FormFieldConfig, { type: "file" }>;
        return (
          <Input
            type="file"
            accept={fileField.accept}
            multiple={fileField.multiple}
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
            {...register(field.name, createEventHandlers())}
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {renderField()}
      {errors[field.name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[field.name]?.message as string}
        </p>
      )}
    </div>
  );
};
