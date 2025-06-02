import { X } from "lucide-react";
import React from "react";

import { OptionIcon } from "./option-icon";
import { SelectOption } from "./select.types";

interface MultiSelectDisplayProps {
  selectedOptions: SelectOption[];
  maxSelectedDisplay: number;
  placeholder: string;
  onRemoveItem: (value: string, event: React.MouseEvent) => void;
}

export const MultiSelectDisplay: React.FC<MultiSelectDisplayProps> = ({
  selectedOptions,
  maxSelectedDisplay,
  placeholder,
  onRemoveItem,
}) => {
  if (selectedOptions.length === 0) {
    return <span className="">{placeholder}</span>;
  }

  const displayOptions = selectedOptions.slice(0, maxSelectedDisplay);
  const remainingCount = selectedOptions.length - maxSelectedDisplay;

  return (
    <div className="flex min-h-[20px] flex-wrap items-center gap-1">
      {displayOptions.map((option) => (
        <div
          key={option.value}
          className="inline-flex items-center gap-1 rounded-sm bg-black-10 p-2 text-sm"
        >
          <OptionIcon icon={option.icon} label={option.label} />
          <span className="max-w-[120px] truncate">{option.label}</span>
          <button
            type="button"
            onClick={(e) => onRemoveItem(option.value, e)}
            className="inline-flex size-3 items-center justify-center rounded-full transition-colors"
            tabIndex={-1}
          >
            <X size={10} />
          </button>
        </div>
      ))}
      {remainingCount > 0 && (
        <span className="text-muted-foreground text-xs">
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};
