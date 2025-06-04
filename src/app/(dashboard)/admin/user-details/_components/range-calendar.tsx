"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export type DateRangeValue = {
  startDate: Date | null;
  endDate: Date | null;
};

interface DateRangePickerProps {
  onDateRangeChange?: (startDate: Date | null, endDate: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  startDateParam?: string;
  endDateParam?: string; 
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onDateRangeChange,
  placeholder = "Select date range",
  className = "",
  disabled = false,
  startDateParam = "startDate",
  endDateParam = "endDate",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const formatDateForURL = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const parseDateFromURL = (dateStr: string): Date | undefined => {
    if (!dateStr) return undefined;
    
    const [year, month, day] = dateStr.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return undefined;
    
    return new Date(year, month - 1, day);
  };
  
  const initializeDateRange = (): DateRange | undefined => {
    const startDateStr = searchParams.get(startDateParam);
    const endDateStr = searchParams.get(endDateParam);
    
    if (!startDateStr && !endDateStr) return undefined;
    
    return {
      from: startDateStr ? parseDateFromURL(startDateStr) : undefined,
      to: endDateStr ? parseDateFromURL(endDateStr) : undefined,
    };
  };
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initializeDateRange()
  );

  const updateURL = (range: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (range?.from) {
      params.set(startDateParam, formatDateForURL(range.from));
    } else {
      params.delete(startDateParam);
    }
    
    if (range?.to) {
      params.set(endDateParam, formatDateForURL(range.to));
    } else {
      params.delete(endDateParam);
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDateSelect = (range: DateRange | undefined): void => {
    setDateRange(range);
    updateURL(range);
    
    if (onDateRangeChange) {
      onDateRangeChange(range?.from || null, range?.to || null);
    }

    if (range?.from && range?.to) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const urlDateRange = initializeDateRange();
    const currentRange = dateRange;
    
    const isSameDate = (date1: Date | undefined, date2: Date | undefined): boolean => {
      if (!date1 && !date2) return true;
      if (!date1 || !date2) return false;
      
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate();
    };
    
    const rangesEqual = 
      isSameDate(urlDateRange?.from, currentRange?.from) &&
      isSameDate(urlDateRange?.to, currentRange?.to);
    
    if (!rangesEqual) {
      setDateRange(urlDateRange);
      if (onDateRangeChange) {
        onDateRangeChange(urlDateRange?.from || null, urlDateRange?.to || null);
      }
    }
  }, [searchParams, startDateParam, endDateParam]);

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
    updateURL(undefined);
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
            className={`flex-1 h-[46px] rounded-[10px] justify-start text-left font-normal border-gray-300 bg-white w-full
  ${dateRange?.from ? "text-black" : "text-[#999] hover:text-[#d9d9d9]"}`}
          >
            <CalendarIcon className=" h-2 w-2" />
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
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Clear
                </Button>
                <Button size="sm" onClick={() => setIsOpen(false)}>
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