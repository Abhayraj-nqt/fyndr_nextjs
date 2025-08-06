import React from "react";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: string | React.ReactNode;
};

export type BaseProps = {
  label?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  options: SelectOption[];
  name?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  noOptionsText?: string;
  maxSelectedDisplay?: number;
  iconClassName?: string;
};

export type SingleSelectProps = BaseProps & {
  multi?: false;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};

export type MultiSelectProps = BaseProps & {
  multi: true;
  value?: string[];
  onValueChange?: (values: string[]) => void;
  defaultValue?: string[];
};

export type Props = SingleSelectProps | MultiSelectProps;
