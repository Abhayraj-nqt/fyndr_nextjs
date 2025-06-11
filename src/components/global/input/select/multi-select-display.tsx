"use client";

import { X, MoreHorizontal } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [showOverflow, setShowOverflow] = useState(false);
  const [visibleCount, setVisibleCount] = useState(maxSelectedDisplay);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || selectedOptions.length === 0) return;

      const container = containerRef.current;
      const containerWidth = container.offsetWidth;

      // Create temporary elements to measure actual widths
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.visibility = "hidden";
      tempContainer.style.display = "flex";
      tempContainer.style.gap = "4px";
      tempContainer.style.alignItems = "center";
      document.body.appendChild(tempContainer);

      let totalWidth = 0;
      let count = 0;
      const overflowButtonWidth = 50; // Approximate width of overflow button

      for (let i = 0; i < selectedOptions.length; i++) {
        const option = selectedOptions[i];

        // Create temporary item to measure
        const tempItem = document.createElement("div");
        tempItem.className =
          "inline-flex items-center gap-1 rounded-sm bg-black-10 p-2 text-sm flex-shrink-0";
        tempItem.innerHTML = `
          <span class="shrink-0 size-4"></span>
          <span class="max-w-[120px] truncate">${option.label}</span>
          <span class="inline-flex size-3 items-center justify-center"></span>
        `;
        tempContainer.appendChild(tempItem);

        const itemWidth = tempItem.offsetWidth;
        const newTotalWidth = totalWidth + itemWidth + (i > 0 ? 4 : 0); // Add gap

        // Check if adding this item would require overflow button
        const wouldNeedOverflow = i < selectedOptions.length - 1;
        const availableWidth =
          containerWidth - (wouldNeedOverflow ? overflowButtonWidth : 0);

        if (newTotalWidth > availableWidth && count > 0) {
          break;
        }

        totalWidth = newTotalWidth;
        count++;
      }

      document.body.removeChild(tempContainer);

      if (count < selectedOptions.length && count > 0) {
        setVisibleCount(count);
        setShowOverflow(true);
      } else {
        setVisibleCount(selectedOptions.length);
        setShowOverflow(false);
      }
    };

    // Delay the check to ensure DOM is ready
    const timeoutId = setTimeout(checkOverflow, 100);

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(checkOverflow, 100);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [selectedOptions]);

  if (selectedOptions.length === 0) {
    return <span className="">{placeholder}</span>;
  }

  const visibleOptions = selectedOptions.slice(0, visibleCount);
  const hiddenOptions = selectedOptions.slice(visibleCount);

  const handleRemoveItem = (value: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onRemoveItem(value, event);
  };

  return (
    <div
      ref={containerRef}
      className="flex min-h-[20px] w-full flex-wrap items-center gap-1"
    >
      {visibleOptions.map((option) => (
        <div
          key={option.value}
          data-item
          className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-black-10 p-2 text-sm"
        >
          <OptionIcon icon={option.icon} label={option.label} />
          <span className="max-w-[120px] truncate">{option.label}</span>
          <span
            onClick={(e) => handleRemoveItem(option.value, e)}
            className="inline-flex size-4 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black-20"
          >
            <X size={10} />
          </span>
        </div>
      ))}

      {showOverflow && hiddenOptions.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <div className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-sm bg-black-10 p-2 text-sm hover:bg-black-20">
              <MoreHorizontal size={12} />
              <span className="text-xs">+{hiddenOptions.length}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-80 p-3"
            align="start"
            side="bottom"
            sideOffset={5}
            alignOffset={0}
            avoidCollisions={true}
            collisionPadding={10}
          >
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Selected Options</h4>
              <div className="max-h-60 space-y-1 overflow-y-auto">
                {selectedOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center justify-between rounded-sm bg-gray-50 p-2 hover:bg-gray-100"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <OptionIcon icon={option.icon} label={option.label} />
                      <span className="truncate text-sm">{option.label}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-6 p-0 hover:bg-red-100"
                      onClick={(e) => handleRemoveItem(option.value, e)}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
