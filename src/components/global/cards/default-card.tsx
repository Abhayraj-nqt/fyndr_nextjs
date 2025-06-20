import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const DefaultCard = ({ className, children }: Props) => {
  return (
    <div className={cn("rounded-10 bg-white p-4", `${className}`)}>
      {children}
    </div>
  );
};

export default DefaultCard;
