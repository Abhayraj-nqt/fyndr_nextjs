"use server";

import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import { GetAppointmentSlots } from "@/types/appointment/appointment.action.type";

export const onGetAppointmentSlots: GetAppointmentSlots = async ({
  params,
  payload,
}) => {
  const { locationId } = params;
  const endpoint = `${API_BASE_URL}/appointment/slots?locationId=${locationId}`;
  return _post(endpoint, payload);
};
