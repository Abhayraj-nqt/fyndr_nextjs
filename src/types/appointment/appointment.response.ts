import { AppointmentSlot } from "./appointment.types";

export type GetAppointmentSlotsResponse = {
  isLocationTimezonePresent: boolean;
  timeZone: "GMT+1 (London)" | string;
  list: AppointmentSlot[];
};
