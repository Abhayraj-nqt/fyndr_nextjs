import Image from "next/image";
import React from "react";

import ASSETS from "@/constants/assets";
import { StoreCategory } from "@/types/store/store.types";

type Props = {
  category: StoreCategory;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <div className="relative h-fit cursor-pointer">
      <Image
        src={category?.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR}
        alt={category.name}
        width={350}
        height={300}
        className="aspect-[5/3] w-full rounded-10"
      />
      <div className="flex-center body-1 lg:heading-7 absolute bottom-0 w-full rounded-b-10 bg-black/80 p-4 text-white">
        {category.name}
      </div>
    </div>
  );
};

export default CategoryCard;
