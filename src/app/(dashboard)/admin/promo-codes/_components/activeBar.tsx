import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActivePromoResponse } from "@/types/api-response/promocode.response";
type Props = {
    data: ActivePromoResponse | undefined;
  };
const ActiveBar = ({data}:Props) => {
    console.log("d", data);
  return (
    <div className="flex space-x-4 pb-4 relative w-full overflow-x-scroll">
      {data?.map((item) => (
        
        <Card key={item.id} className={ item.status =="INACTIVE" ? "bg-[#f0f0f0] filter grayscale w-[180px] flex-shrink-0": "w-[180px] flex-shrink-0"}>
          <img
            src={item.imageUrl}
            alt="Card image"
            className="w-full h-48 object-cover rounded-[10px]"
          />
          <CardContent className="p-4 flex flex-col justify-evenly">
            <p className="text-sm" style={{ color: "#257cdb" }}>
              {item.promoCode}
            </p>
            <p className="text-xs">Valid till {item.endDate} </p>
            <p className="text-xs">{item.promoCodeType=="REGISTRATION" ? "Registrations: " : "Redemptions: "}{item.userRegistered}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActiveBar;
