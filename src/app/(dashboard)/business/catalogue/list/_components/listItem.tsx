"use client";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import HtmlContent from "@/components/global/html-content";
import { Modal } from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { API_BASE_URL } from "@/environment";
import { useFetchStoreLocation } from "@/hooks/catalogues/useFetchStoreLocation";
import { useUpdateStoreURL } from "@/hooks/catalogues/useUpdateStoreURL";
import {
  CatalogueItem,
  storeLocations,
} from "@/types/api-response/catalogue.response";

import StoreUrl from "./copyStoreUrl";

type ListItemProps = {
  item: CatalogueItem;
  hideDelete?: boolean;
};

const ListItem: React.FC<ListItemProps> = ({
  item: { images, name, description, url },
  // hideDelete,
  item,
}) => {
  const [editUrlVisible, setEditUrlVisible] = useState<boolean>(false);
  const [newUrl, setNewUrl] = useState<string>("");
  const [selectedCatalogues, setSelectedCatalogues] = useState<CatalogueItem>();
  const [catalogueId, setCatalogueId] = useState<number>(0);
  const [fetchLocation, setFetchLocation] = useState<boolean>(false);
  const [locations, setLocations] = useState<storeLocations[]>([]);
  const [value, setValue] = useState<string>("");
  const storeUrl = `${API_BASE_URL}/catalogue/store/${url}`;

  const router = useRouter();

  const { mutate: updateUrl } = useUpdateStoreURL(() => {
    setEditUrlVisible(false);
    router.refresh();
  });

  const { mutate: fetchStoreLocation } = useFetchStoreLocation((data) => {
    setLocations(data?.locations);
    setFetchLocation(true);
  });

  const handleOnClick = () => {
    const regex = /^[a-zA-Z0-9 ]+$/;
    if (newUrl.trim() === "") {
      alert("Please type new URL to proceed");
    } else if (!regex.test(newUrl)) {
      alert("Special characters not allowed");
    } else {
      updateUrl({ catalogueId: catalogueId!, newUrl });
      setEditUrlVisible(false);
    }
  };

  const avatarSrc =
    images?.[0]?.img ||
    images?.[0]?.img_url ||
    "/images/fyndr-placeholder-gray.svg";

  return (
    <>
      <div className="flex items-start gap-4 rounded-md border bg-white p-4 shadow-sm">
        <Image
          src={avatarSrc}
          alt="thumbnail"
          // onClick={onClick}
          width={80}
          height={80}
          className="size-20 cursor-pointer rounded object-cover"
        />
        <div className="flex flex-1 flex-col gap-2">
          <h5
            // onClick={onClick}
            className="cursor-pointer text-lg font-semibold"
          >
            {name}
          </h5>

          {description?.trim() && (
            <div className="max-h-24 overflow-hidden text-sm text-gray-600">
              {<HtmlContent htmlString={description} />}
            </div>
          )}

          {url && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">URL:</span>
              <span
                className="cursor-pointer text-blue-600 underline"
                onClick={() => {
                  setCatalogueId(item.objid);
                  setSelectedCatalogues(item);
                  if (item.url) {
                    fetchStoreLocation({ store_url: item.url });
                  } else {
                    console.error("URL is missing!");
                  }
                }}
              >
                {`${API_BASE_URL}/catalogue/store/${url}`}
              </span>
              <StoreUrl storeUrl={storeUrl} />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <SquarePen
            // onClick={onClick}
            className="flex-center text-primary-400"
          />
          {/* {hideDelete && ( */}
          <Button
            className="border border-gray-200 bg-white text-black hover:bg-white"
            onClick={() => {
              setNewUrl("");
              setCatalogueId(item.objid);
              setSelectedCatalogues(item);
              setEditUrlVisible(true);
            }}
          >
            Edit URL
          </Button>
          {/* )} */}

          {/* {!hideDelete && (
          <i
            className="fas fa-trash-alt cursor-pointer text-xl text-red-600"
            // onClick={() => setVisible(true)}
          />
        )} */}
        </div>
      </div>

      <Modal
        open={editUrlVisible}
        onOpenChange={setEditUrlVisible}
        width="30%"
        title={<p className="text-left text-lg font-medium">Edit URL</p>}
        showCloseButton={true}
        primaryAction={{
          label: "OK",
          onClick: handleOnClick,
          className: "bg-primary-500 text-white hover:bg-primary-600",
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => setEditUrlVisible(false),
          variant: "outline",
        }}
      >
        <p className="mb-2 text-sm text-gray-700">
          URL: {selectedCatalogues?.url}
        </p>
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Enter new URL"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Modal>
      <Modal
        open={fetchLocation}
        onOpenChange={setFetchLocation}
        title={
          <div className="text-center text-lg font-semibold">Locations</div>
        }
        primaryAction={{
          label: "OK",
          onClick: () => {},
          className: "bg-primary-500 text-white hover:bg-primary-600",
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => setFetchLocation(false),
          variant: "outline",
        }}
      >
        <p className="mb-4 text-sm text-gray-800">
          URL: {selectedCatalogues?.url}
        </p>

        {locations?.length > 0 ? (
          <RadioGroup
            value={value}
            onValueChange={(val) => setValue(val)}
            className="flex flex-col gap-3"
          >
            {locations?.map((item) => (
              <Label
                key={item.objid}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-300 p-3"
              >
                <RadioGroupItem value={String(item.objid)} />
                <span className="text-sm text-primary-500">
                  {item.addressLine1}, {item.addressLine2}, {item.city},{" "}
                  {item.postalCode}
                </span>
              </Label>
            ))}
          </RadioGroup>
        ) : (
          <p className="text-gray-500">No location found</p>
        )}
      </Modal>
    </>
  );
};

export default ListItem;
