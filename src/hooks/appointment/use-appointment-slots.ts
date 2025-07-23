"use client";

import { useQuery } from "@tanstack/react-query";

import { onGetAppointmentSlots } from "@/actions/appointment.action";
import { GetAppointmentSlotsParams } from "@/types/appointment/appointment.params";

export const useGetAppointmentSlots = ({
  params,
  payload,
}: GetAppointmentSlotsParams) => {
  const QUERY_KEY = ["appointment-slots", params, payload];
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => onGetAppointmentSlots({ params, payload }),
  });
};
