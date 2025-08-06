"use client";

import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { onDeleteLocation } from "@/actions/others.action";
import ContainerWrapper from "@/components/global/container-wrapper";
import ROUTES from "@/constants/routes";
import { useUser } from "@/hooks/auth";
import { UpdateLocationResponse } from "@/types/location/location.response";

import CreateLocationButton from "./_components/create-location-button";

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
  const router = useRouter();
  const locations = user?.locations || [];

  //   const [locations, setLocations] = useState<Location[]>([]);

  // useEffect(() => {
  //   if (!user) return;
  //   const fetchAdditionalAccountData = async () => {
  //     const { status, data } = await onGetAccount({
  //       payload: {
  //         email: user?.email || "",
  //         regMode: "classic",
  //         isBusiness: user?.isBusiness || false,
  //       },
  //     });

  //     if (status && data?.locations) {
  //       setLocations(data.locations);

  //       console.log(data.locations, "this is the locations data");
  //     }
  //   };

  //   fetchAdditionalAccountData();
  // }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEdit = async (objid: number) => {
    router.push(ROUTES.BUSINESS_ACCOUNT_LOCATION_EDIT(objid));
  };

  const handleDelete = async (location: Location) => {
    console.log("Delete location:", location?.objid);

    if (window.confirm("Are you sure you want to delete this location?")) {
      const data = await onDeleteLocation({
        objid: location?.objid,
        bizid: user?.bizid,
      });
      console.log("data", data);
      setLocations(locations?.filter((location) => location?.objid !== objid));
    }
  };

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
            <div className="text-center text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ContainerWrapper
        title="Manage Locations"
        headerOption={<CreateLocationButton />}
      >
        {/* Locations List */}
        <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
          {locations?.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No locations found. Create your first location to get started.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {locations?.map((location: Location) => (
                <div
                  key={location?.objid}
                  className="flex items-center justify-between p-6 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    {/* <div
                      className="text-blue-500"
                      onClick={() => handleQrCode(location)}
                    >
                      <QrCode size={"32"} />
                    </div> */}

                    <h3 className="text-lg font-medium text-gray-900">
                      {location?.locName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Edit
                      className="cursor-pointer text-primary"
                      onClick={() => handleEdit(location.objid)}
                      size={20}
                    />

                    <button
                      onClick={() => handleDelete(location)}
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
      </ContainerWrapper>

      {/* <Modal
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
       
          <QRCode
            style={{ maxWidth: "100%" }}
            size={160}
            logoWidth={40}
            logoImage={
              user?.qrLogo ? `${user.qrLogo}?v=${Date.now()}` : undefined
            }
          />
        </div>
      </Modal> */}
    </>
  );
};

export default LocationManager;
