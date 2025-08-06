import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Indicator = ({ className }: Props) => {
  return (
    <div className={cn("size-4 rounded-full bg-black-40", className)}></div>
  );
};

export default Indicator;
