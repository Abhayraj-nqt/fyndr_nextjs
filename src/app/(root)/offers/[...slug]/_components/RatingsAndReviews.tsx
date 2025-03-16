// import Image from "next/image";
import React from "react";

import DefaultCard from "@/components/global/cards/DefaultCard";
import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const RatingCard = () => {
//   const arr: unknown[] = [];

//   return (
//     <Card>
//       <div className="">
//         <p>Prerna G</p>
//         <p>2023-06-27, 4:00 PM</p>
//       </div>
//       <div className="">**stars**</div>
//       <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
//         <div className="flex w-max space-x-4 p-4">
//           {arr.map((item, i) => (
//             <figure key={i} className="shrink-0">
//               <div className="overflow-hidden rounded-md">
//                 <Image
//                   src={"/img/url"}
//                   alt="/img/url"
//                   className="aspect-[3/4] size-fit object-cover"
//                   width={300}
//                   height={200}
//                 />
//               </div>
//             </figure>
//           ))}
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>
//       <div className="">
//         <p className="">Review</p>
//         <p className="">Review reply</p>
//       </div>
//     </Card>
//   );
// };

const RatingsAndReviews = () => {
  return (
    <DefaultCard>
      <h2>Ratings & Reviews</h2>
      <div className="">rating</div>
      <div className="flex-between">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Button variant={"ghost"} className="">
          See all
        </Button>
      </div>
      <div className=""></div>
    </DefaultCard>
  );
};

export default RatingsAndReviews;
