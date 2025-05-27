import InputWrapper from "@/components/global/input/input-wrapper";
import { Input } from "@/components/ui/input";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Searchable Select Component
interface SearchableSelectProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onValueChange,
  placeholder = "Search or select...",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update display value when value prop changes
  useEffect(() => {
    if (value) {
      const selectedOption = options.find((option) => option.value === value);
      setDisplayValue(selectedOption ? selectedOption.label : value);
    } else {
      setDisplayValue("");
    }
  }, [value, options]);

  // Filter options based on search term
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        // Reset display value if no valid selection was made
        if (value) {
          const selectedOption = options.find(
            (option) => option.value === value
          );
          setDisplayValue(selectedOption ? selectedOption.label : value);
        } else {
          setDisplayValue("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setDisplayValue(inputValue);

    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleOptionSelect = (option: { value: string; label: string }) => {
    onValueChange(option.value);
    setDisplayValue(option.label);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
      setSearchTerm(displayValue);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
      // Reset to original value
      if (value) {
        const selectedOption = options.find((option) => option.value === value);
        setDisplayValue(selectedOption ? selectedOption.label : value);
      } else {
        setDisplayValue("");
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions.length === 1) {
        handleOptionSelect(filteredOptions[0]);
      }
    }
  };

  return (
    <InputWrapper>
      <div ref={containerRef} className="relative w-full">
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            value={isOpen ? searchTerm : displayValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={`input-primary`}
          />
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            disabled={disabled}
          >
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto p-1 no-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionSelect(option)}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center justify-between rounded ${
                    value === option.value
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-900"
                  }`}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="h-4 w-4" />}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options found
              </div>
            )}
          </div>
        )}
      </div>
    </InputWrapper>
  );
};

export default SearchableSelect;
