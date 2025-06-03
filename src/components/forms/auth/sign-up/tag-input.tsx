// components/global/input/tag-input.tsx
import { X } from "lucide-react";
import React, { useState, KeyboardEvent } from "react";

import Input from "@/components/global/input";

interface TagInputProps {
  value: string[]; // Array of tags
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  value = [],
  onChange,
  placeholder = "Enter tags and press Enter",
  disabled = false,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !value.includes(trimmedValue)) {
      onChange([...value, trimmedValue]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={() => {
          // Add tag on blur if there's content
          if (inputValue.trim()) {
            addTag();
          }
        }}
      />

      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 rounded-full border border-secondary-20 bg-white px-3 py-1 text-sm text-black-50"
            >
              <span>{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-secondary focus:outline-none"
                  aria-label={`Remove ${tag} tag`}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
