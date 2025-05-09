import { SquarePen, Copy } from "lucide-react";
import Image from "next/image";

import HtmlContent from "@/components/global/html-content";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/environment";
import { CatalogueItem } from "@/types/api-response/catalogue.response";

type ListItemProps = {
  item: CatalogueItem;
  deletePress: () => void;
  onClick: () => void;
  hideDelete?: boolean;
  onEditClick: () => void;
  onStoreUrlClick: () => void;
};

const ListItem: React.FC<ListItemProps> = ({
  item: { images, name, description, url },
  // deletePress,
  onClick,
  // hideDelete,
  onEditClick,
  onStoreUrlClick,
}) => {
  const copyTextToClipboard = () => {
    const urlWithReferralCode = `${API_BASE_URL}/catalogue/store/${url}`;
    navigator.clipboard
      .writeText(urlWithReferralCode)
      .then(() => {
        alert("URL copied");
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };

  const avatarSrc =
    images?.[0]?.img || images?.[0]?.img_url || "/placeholder.png";

  return (
    <div className="flex items-start gap-4 rounded-md border bg-white p-4 shadow-sm">
      <Image
        src={avatarSrc}
        alt="thumbnail"
        onClick={onClick}
        width={80}
        height={80}
        className="size-20 cursor-pointer rounded object-cover"
      />
      <div className="flex flex-1 flex-col gap-2">
        <h5 onClick={onClick} className="cursor-pointer text-lg font-semibold">
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
              onClick={onStoreUrlClick}
            >
              {`${API_BASE_URL}/catalogue/store/${url}`}
            </span>
            <Copy
              onClick={copyTextToClipboard}
              className="size-4 cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <SquarePen onClick={onClick} className="flex-center text-primary-400" />
        {/* {hideDelete && ( */}
        <Button
          className="border border-gray-200 bg-white text-black hover:bg-white"
          onClick={onEditClick}
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
  );
};

export default ListItem;
