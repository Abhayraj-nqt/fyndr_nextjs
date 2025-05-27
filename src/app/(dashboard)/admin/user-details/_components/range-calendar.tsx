
"use client";
export type { DateRangePickerProps };
export type DateRangeValue = {
  startDate: Date | null;
  endDate: Date | null;
};
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps {
  onDateRangeChange?: (startDate: Date | null, endDate: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  initialDateRange?: DateRange;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  onDateRangeChange, 
  placeholder = "Select date range",
  className = "",
  disabled = false,
  initialDateRange
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDateSelect = (range: DateRange | undefined): void => {
    setDateRange(range);
        if (onDateRangeChange) {
      onDateRangeChange(range?.from || null, range?.to || null);
    }
    
    if (range?.from && range?.to) {
      setIsOpen(false);
    }
  };

  const formatDateRange = (): string => {
    if (!dateRange?.from) return placeholder;
    
    if (dateRange.from && !dateRange.to) {
      return format(dateRange.from, "MMM dd, yyyy");
    }
    
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
    }
    
    return placeholder;
  };

  const clearSelection = (): void => {
    setDateRange(undefined);
    if (onDateRangeChange) {
      onDateRangeChange(null, null);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            disabled={disabled}
            className="flex-1 h-[46px] rounded-[10px] justify-start text-left font-normal text-[#d9d9d9] hover:text-[#d9d9d9] border-gray-300 bg-white w-full"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              initialFocus
            />
            {dateRange?.from && (
              <div className="flex justify-between items-center mt-3 pt-3 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearSelection}
                >
                  Clear
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;