import { Globe, Heart, MapPinned, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Button from "@/components/global/buttons/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ROUTES from "@/constants/routes";
import { parseAddress } from "@/lib/utils";

type Props = {
  businessDirectory: BusinessDirectory;
};

const BusinessDirectoryCard = ({ businessDirectory }: Props) => {
  return (
    <Card className="grid max-h-fit w-full grid-cols-1 flex-col gap-4 rounded-lg border border-secondary-20 p-4 shadow-none duration-100 lg:grid-cols-5 lg:gap-6">
      <Link
        href={ROUTES.OFFER_DETAILS(
          businessDirectory.bizName,
          businessDirectory.qrid.toString()
        )}
        className="lg:col-span-2"
      >
        <Image
          src={
            businessDirectory?.mainLogo
              ? businessDirectory.mainLogo
              : "/fyndr-placeholder-gray.svg"
          }
          alt={`${businessDirectory.bizName} on Fyndr Now!`}
          width={400}
          height={200}
          className="aspect-[2/1] size-full rounded-md object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-6 lg:col-span-3">
        <CardHeader className="flex-between flex-row items-center gap-2 p-0">
          <CardTitle>
            <h2 className="title-7-medium text-black-80">
              {businessDirectory.bizName}
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-0">
          <CardDescription className="body-1 text-secondary-80">
            {`${
              businessDirectory?.distance
                ? businessDirectory?.distance.toFixed(1)
                : "0"
            } miles, ${parseAddress(businessDirectory)}`}
          </CardDescription>
          <div className="flex items-center gap-4 text-black-80">
            <Phone size={20} />
            <Globe size={20} />
            <MapPinned size={20} />
            <div className="flex items-center justify-center gap-2">
              <Heart size={20} />
              <p>1</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-1 gap-4 p-0 lg:grid-cols-2">
          <Button
            variant="primary-outlined"
            stdHeight
            stdWidth
            // className="min-h-9 rounded-md"
          >
            {`1${" "}`} Active Offers & Events
          </Button>
          <Button
            variant="primary"
            stdHeight
            stdWidth
            // className="min-h-9 rounded-md"
          >
            View Store
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default BusinessDirectoryCard;
