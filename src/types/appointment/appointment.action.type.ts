import { ActionResponse } from "../global";
import { GetAppointmentSlotsParams } from "./appointment.params";
import { GetAppointmentSlotsResponse } from "./appointment.response";

export type GetAppointmentSlots = ({
  params,
  payload,
}: GetAppointmentSlotsParams) => Promise<
  ActionResponse<GetAppointmentSlotsResponse>
>;
