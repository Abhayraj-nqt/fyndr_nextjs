import { Globe, Heart, MapPinned, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  businessDirectory: BusinessDirectory;
};

const BusinessDirectoryCard = ({ businessDirectory }: Props) => {
  return (
    <Card className="flex max-h-fit w-full flex-row gap-4 rounded-lg border-none p-4 shadow-none duration-100">
      <Link
        href={`/offers/${businessDirectory?.bizName?.replace(
          /[.\W]+/g,
          "-"
        )}/${businessDirectory?.qrid}`.toLowerCase()}
      >
        <Image
          src={
            businessDirectory?.mainLogo
              ? businessDirectory.mainLogo
              : "/fyndr-placeholder-gray.svg"
          }
          alt="img/alt"
          width={200}
          height={100}
          className="aspect-[2/1] size-full h-32 rounded-md object-cover xl:max-w-60"
        />
      </Link>
      <div className="flex flex-col gap-4">
        <CardHeader className="flex-between flex-row items-center gap-2 p-0">
          <CardTitle>{businessDirectory.bizName}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-0">
          <CardDescription className="body-regular text-light-300">
            {`${
              businessDirectory?.distance
                ? businessDirectory?.distance.toFixed(1)
                : "0"
            } miles, ${""}`}
          </CardDescription>
          <div className="flex items-center gap-4">
            <Phone size={20} />
            <Globe size={20} />
            <MapPinned size={20} />
            <div className="flex items-center justify-center gap-2">
              <Heart size={20} />
              <p>1</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-between gap-4 p-0">
          <Button className="btn-primary-outlined">
            {`1${" "}`} Active Offers & Events
          </Button>
          <Button className="btn-primary">{`1${" "}`} View Store</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default BusinessDirectoryCard;
