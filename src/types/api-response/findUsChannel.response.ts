import { Option } from "../data-table";

export interface ChannelOptions extends Option {
  id: number;
  options: string;
  active: boolean;
}

export interface DropDownOprions {
    value: string;
  label: string;
}

export type ChannelOptionsResponse = ChannelOptions[];
