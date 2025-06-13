"use client";

import { Edit, Trash2 } from "lucide-react";
// import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

// import { onAddLocation, onDeleteLocation } from "@/actions/others.action";
import { Modal } from "@/components/global/modal";
import QrCode from "@/components/icons/qr-code";
// import { Form } from "@/components/ui/form";
import { useUser } from "@/hooks/auth";

type Props = {
  children: React.ReactNode;
};

type Location = {
  objid: number;
  locName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  parentLocation: number;
  catalogueName: string | null;
  qrCode: string;
  qrid: number;
};

const LocationManager = ({ children }: Props) => {
  // const sanitizedQrPrefix = qrPrefix.endsWith('/') ? qrPrefix.slice(0, -1) : qrPrefix;
  const { isLoading, user, error } = useUser();
  // const router = useRouter();

  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [locations, setLocations] = useState(user?.locations);
  const [locationForm, setLocationForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  useEffect(() => {
    console.log(user?.locations);
  }, [user?.locations]);

  // useEffect(() => {
  //   const locarionData = {
  //     locName: "subhLoc",
  //     ctryCode: "+1",
  //     phone: "9145276354",
  //     addressLine1: "Baker street 1A amrit",
  //     addressLine2: "",
  //     city: "Phoenix",
  //     state: "AZ",
  //     lat: 33.4482266,
  //     lng: -112.0776781,
  //     country: "US",
  //     bizid: 1000389,
  //     postalCode: "85001",
  //     parentLocation: 493,
  //     timeZone: null,
  //     workingHours: "",
  //     deliveryOptions: "",
  //     deliveryWithin: null,
  //     workingHoursAndSlots: {
  //       workingHours: {
  //         MONDAY: [],
  //         TUESDAY: [],
  //         WEDNESDAY: [],
  //         THURSDAY: [],
  //         FRIDAY: [],
  //         SATURDAY: [],
  //         SUNDAY: [],
  //       },
  //       slotDurationInMin: null,
  //       slotCapacity: -1,
  //       catalogueAppointmentType: null,
  //       isCampaignBookingEnabled: false,
  //     },
  //   };

  //   addLocation(locarionData);
  // });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const addLocation = async (data) => {
  //   const response = await onAddLocation({
  //     locName: data?.locName,
  //     ctryCode: data?.ctryCode,
  //     phone: data?.phone,
  //     addressLine1: data?.addressLine1,
  //     addressLine2: data?.addressLine2,
  //     city: data?.city,
  //     state: data?.state,
  //     lat: data?.lat,
  //     lng: data?.lng,
  //     country: data?.country,
  //     bizid: data?.bizid,
  //     postalCode: data?.postalCode,
  //     parentLocation: data?.parentLocation,
  //     timeZone: data?.timeZone,
  //     workingHours: data?.workingHours,
  //     deliveryOptions: data?.deliveryOptions,
  //     deliveryWithin: data?.deliveryWithin,
  //     workingHoursAndSlots: {
  //       workingHours: {
  //         MONDAY: [],
  //         TUESDAY: [],
  //         WEDNESDAY: [],
  //         THURSDAY: [],
  //         FRIDAY: [],
  //         SATURDAY: [],
  //         SUNDAY: [],
  //       },
  //       slotDurationInMin: data?.workingHoursAndSlots?.slotDurationInMin,
  //       slotCapacity: data?.workingHoursAndSlots?.slotCapacity,
  //       catalogueAppointmentType:
  //         data?.workingHoursAndSlots?.catalogueAppointmentType,
  //       isCampaignBookingEnabled:
  //         data?.workingHoursAndSlots?.isCampaignBookingEnabled,
  //     },
  //   });

  //   if (response.success) {
  //     setLocations(response);
  //   }
  // };

  // const handleEdit = (id) => {
  //   console.log("Edit location:", id);
  // };

  // const handleDelete = async (location: Location) => {
  //   console.log("Delete location:", location?.objid);

  //   if (window.confirm("Are you sure you want to delete this location?")) {
  //     const data = await onDeleteLocation({
  //       objid: location?.objid,
  //       bizid: user?.bizid,
  //     });
  //     console.log("data", data);
  //     setLocations(locations?.filter((location) => location?.objid !== objid));
  //   }
  // };

  const handleCreateLocation = () => {
    setLocationForm(true);
  };

  // function handleGoBack() {
  //   setLocationForm(false);
  // }
  // console.log("selectedLocation", selectedLocation?.objid);
  // const handleQrCode = (location: Location) => {
  //   setSelectedLocation(location);
  //   setQrModalVisible(true);
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-blue-500">
              Manage Locations
            </h1>
            <button className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white">
              Create Location
            </button>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
            <div className="text-center text-gray-500">
              Loading locations...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-blue-500">
              Manage Locations
            </h1>
            <button className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white">
              Create Location
            </button>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
            {/* <div className="text-center text-red-500">{error}</div> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      {!locationForm ? (
        <>
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-medium text-blue-500">
                Manage Locations
              </h1>
              <button
                onClick={handleCreateLocation}
                className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600"
              >
                Create Location
              </button>
            </div>

            {/* Locations List */}
            <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
              {locations?.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No locations found. Create your first location to get started.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {locations?.map((location) => (
                    <div
                      key={location?.objid}
                      className="flex items-center justify-between p-6 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="text-blue-500"
                          // onClick={() => handleQrCode(location)}
                        >
                          <QrCode size={"32"} />
                        </div>

                        <h3 className="text-lg font-medium text-gray-900">
                          {location?.locName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          // onClick={() => handleEdit(location?.objid)}
                          className="rounded-lg p-2 text-blue-500 transition-colors hover:bg-blue-50"
                          title="Edit location"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          // onClick={() => handleDelete(location)}
                          className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                          title="Delete location"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Modal
            trigger={children}
            title={selectedLocation?.locName}
            open={qrModalVisible}
            onOpenChange={(open) => {
              if (!open) {
                setQrModalVisible(false);
                setSelectedLocation(null);
              }
            }}
          >
            <div className="flex items-center justify-center">
              {/* <QrCode size={"32"} /> */}
              <QRCode
                style={{ maxWidth: "100%" }}
                size={160}
                logoWidth={40}
                logoImage={
                  user?.qrLogo ? `${user.qrLogo}?v=${Date.now()}` : undefined
                }
              />
            </div>
          </Modal>
        </>
      ) : (
        <div className="mx-auto max-w-7xl">
          {/* <Form isActive={locationForm} onCancel={handleGoBack} /> */}
          {/* for now form is on hold and place in component/business/form */}
        </div>
      )}
    </div>
  );
};

export default LocationManager;
