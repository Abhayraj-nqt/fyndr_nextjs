import React from "react";

import { cn } from "@/lib/utils";

import { Card } from "../../ui/card";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const DefaultCard = ({ className, children }: Props) => {
  return (
    <Card
      className={cn(
        `p-4 rounded-lg border border-light-700 bg-light-900`,
        `${className}`
      )}
    >
      {children}
    </Card>
  );
};

export default DefaultCard;
