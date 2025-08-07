import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { useCallback, useMemo, useState } from "react";

import { onGetAppointmentSlots } from "@/actions/appointment.action";
import { AppointmentSlot } from "@/types/appointment/appointment.types";
import { ValueLabelProps } from "@/types/global";

interface UseSlotBookingProps {
  initialLocationId?: string;
  locations?: ValueLabelProps[];
  enabled?: boolean;
}

interface SlotBookingState {
  selectedDate: Date;
  selectedLocationId: string | undefined;
  selectedSlot: AppointmentSlot | null;
}

interface UseSlotBookingReturn {
  // State
  state: SlotBookingState;

  // Actions
  setSelectedDate: (date: Date) => void;
  setSelectedLocationId: (locationId: string) => void;
  setSelectedSlot: (slot: AppointmentSlot | null) => void;

  // Computed values
  weekDates: Date[];
  formattedSelectedDate: string;
  weekday: string;

  // Query data
  slots: AppointmentSlot[];
  timezone: string;
  isLocationTimezonePresent: boolean;
  isLoading: boolean;
  error: Error | null;

  // Utilities
  formatDate: (date: Date) => string;
  isDateSelected: (date: Date) => boolean;
  isSlotSelected: (slot: AppointmentSlot) => boolean;
  getAvailableSlots: () => AppointmentSlot[];
  prefetchSlots: (date: Date, locationId: string) => void;
}

export const useSlotBooking = ({
  initialLocationId,
  // locations = [],
  enabled = true,
}: UseSlotBookingProps): UseSlotBookingReturn => {
  const queryClient = useQueryClient();
  const today = useMemo(() => startOfDay(new Date()), []);

  const [state, setState] = useState<SlotBookingState>({
    selectedDate: today,
    selectedLocationId: initialLocationId,
    selectedSlot: null,
  });

  // Memoized computed values
  const weekDates = useMemo(() => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(today, i));
    }
    return dates;
  }, [today]);

  const formattedSelectedDate = useMemo(() => {
    return format(state.selectedDate, "yyyy-MM-dd");
  }, [state.selectedDate]);

  const weekday = useMemo(() => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[state.selectedDate.getDay()];
  }, [state.selectedDate]);

  // Query for appointment slots
  const {
    data: slotsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "appointment-slots",
      state.selectedLocationId,
      formattedSelectedDate,
      weekday,
    ],
    queryFn: () =>
      onGetAppointmentSlots({
        params: { locationId: Number(state.selectedLocationId) },
        payload: {
          selectedDate: formattedSelectedDate,
          weekday,
        },
      }),
    enabled: enabled && !!state.selectedLocationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  // Extract data from query response
  const slots = useMemo(() => slotsData?.data?.list || [], [slotsData]);
  const timezone = useMemo(() => slotsData?.data?.timeZone || "", [slotsData]);
  const isLocationTimezonePresent = useMemo(
    () => slotsData?.data?.isLocationTimezonePresent || false,
    [slotsData]
  );

  // Actions
  const setSelectedDate = useCallback((date: Date) => {
    setState((prev) => ({
      ...prev,
      selectedDate: startOfDay(date),
      selectedSlot: null, // Reset selected slot when date changes
    }));
  }, []);

  const setSelectedLocationId = useCallback((locationId: string) => {
    setState((prev) => ({
      ...prev,
      selectedLocationId: locationId,
      selectedSlot: null, // Reset selected slot when location changes
    }));
  }, []);

  const setSelectedSlot = useCallback((slot: AppointmentSlot | null) => {
    setState((prev) => ({
      ...prev,
      selectedSlot: slot,
    }));
  }, []);

  // Utility functions
  const formatDate = useCallback((date: Date): string => {
    const today = new Date();
    const tomorrow = addDays(today, 1);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    if (isSameDay(date, today)) {
      return `${month} ${day} (Today)`;
    }

    if (isSameDay(date, tomorrow)) {
      return `${month} ${day} (Tomorrow)`;
    }

    return `${month} ${day} (${dayOfWeek})`;
  }, []);

  const isDateSelected = useCallback(
    (date: Date): boolean => {
      return isSameDay(date, state.selectedDate);
    },
    [state.selectedDate]
  );

  const isSlotSelected = useCallback(
    (slot: AppointmentSlot): boolean => {
      return state.selectedSlot?.startTime === slot.startTime;
    },
    [state.selectedSlot]
  );

  const getAvailableSlots = useCallback((): AppointmentSlot[] => {
    return slots.filter((slot) => slot.availableAppointments > 0);
  }, [slots]);

  // Prefetch slots for performance optimization
  const prefetchSlots = useCallback(
    (date: Date, locationId: string) => {
      if (!locationId) return;

      const prefetchDate = format(date, "yyyy-MM-dd");
      const prefetchWeekday = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ][date.getDay()];

      queryClient.prefetchQuery({
        queryKey: [
          "appointment-slots",
          locationId,
          prefetchDate,
          prefetchWeekday,
        ],
        queryFn: () =>
          onGetAppointmentSlots({
            params: { locationId: Number(locationId) },
            payload: {
              selectedDate: prefetchDate,
              weekday: prefetchWeekday,
            },
          }),
        staleTime: 5 * 60 * 1000,
      });
    },
    [queryClient]
  );

  return {
    // State
    state,

    // Actions
    setSelectedDate,
    setSelectedLocationId,
    setSelectedSlot,

    // Computed values
    weekDates,
    formattedSelectedDate,
    weekday,

    // Query data
    slots,
    timezone,
    isLocationTimezonePresent,
    isLoading,
    error,

    // Utilities
    formatDate,
    isDateSelected,
    isSlotSelected,
    getAvailableSlots,
    prefetchSlots,
  };
};
