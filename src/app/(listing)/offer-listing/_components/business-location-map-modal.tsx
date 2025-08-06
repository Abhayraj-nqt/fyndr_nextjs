"use client";

import GoogleMap3, {
  MarkerData,
} from "@/components/global/google-map/google-map3";
import { Modal } from "@/components/global/modal";
import { Coordinates } from "@/types/global";

type Props = {
  trigger: React.ReactNode;
  location: Coordinates;
  id: string;
  address: string;
};

const BusinessLocationMapModal = ({
  trigger,
  location,
  id,
  address,
}: Props) => {
  const markersData: MarkerData[] = [
    {
      id,
      position: location,
    },
  ];
  return (
    <Modal title={"Location"} trigger={trigger}>
      <div className="flex flex-col gap-4">
        <GoogleMap3 height="250px" center={location} markers={markersData} />
        <p className="body-1 text-black-60">{address}</p>
      </div>
    </Modal>
  );
};

export default BusinessLocationMapModal;
