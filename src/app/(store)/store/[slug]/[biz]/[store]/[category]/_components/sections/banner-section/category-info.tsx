import { Store } from "lucide-react";
import Link from "next/link";
import React from "react";

import { onGetStoreCategories } from "@/actions/store.action";
import ROUTES from "@/constants/routes";

type Props = {
  bizId: number;
  catalogueId: number;
  categoryId: number;
  locationId: number;
  storeUrl: string;
  storeName: string;
};

const CategoryInfo = async ({
  bizId,
  catalogueId,
  categoryId,
  locationId,
  storeUrl,
  storeName,
}: Props) => {
  const { success, data: categories } = await onGetStoreCategories({
    params: {
      bizId,
      catalogueId,
    },
  });

  if (!success || !categories) return null;

  const category = categories.find((category) => category.objid === categoryId);

  if (!category) return null;

  return (
    <div className="flex-center flex-col gap-4 rounded-10 bg-transparent">
      <div className="heading-7 md:heading-4 text-white">{category.name}</div>
      <Link
        href={ROUTES.STORE(storeUrl, locationId)}
        className="body-3 md:heading-6 flex-center gap-2 rounded-10 bg-white px-6 py-4 text-primary"
      >
        <span className="flex-center gap-2 md:gap-4">
          <Store className="!size-4 md:!size-6" /> {storeName}
        </span>

        <span className="text-secondary-80">/ {category.name}</span>
      </Link>
    </div>
  );
};

export default CategoryInfo;
