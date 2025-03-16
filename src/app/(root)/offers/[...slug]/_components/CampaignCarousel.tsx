import Image from "next/image";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  images: string[];
};

const CampaignCarousel = ({ images = [] }: Props) => {
  return (
    <>
      {images.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {images.map((url, i) => (
              <CarouselItem key={i}>
                <Image
                  src={url}
                  alt="cmpn-img"
                  height={200}
                  width={400}
                  className="aspect-[2/1] w-full rounded-t-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      ) : (
        <></>
      )}
    </>
  );
};

export default CampaignCarousel;
