import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

const DefaultCard = ({ className, children, id }: Props) => {
  return (
    <div id={id} className={cn("rounded-10 bg-white p-4", `${className}`)}>
      {children}
    </div>
  );
};

export default DefaultCard;
