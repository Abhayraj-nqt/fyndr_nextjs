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

    // <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
    //   <div className="relative aspect-[5/3]">
    //     <Image
    //       src={
    //         category?.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR
    //       }
    //       alt={category.name}
    //       className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
    //       height={300}
    //       width={350}
    //     />
    //     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
    //     <div className="absolute inset-x-0 bottom-0 p-4">
    //       {/* <div className="absolute inset-x-0 bottom-0"> */}
    //       <h3 className="text-center text-lg font-semibold text-white drop-shadow-lg">
    //         {/* <h3 className="heading-6-medium bg-black/80 p-4 text-center text-white drop-shadow-lg"> */}
    //         {category.name}
    //       </h3>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CategoryCard;
