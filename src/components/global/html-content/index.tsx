import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  htmlString: string;
  className?: string;
};

const HtmlContent = ({ htmlString, className }: Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlString }}
      className={cn(className)}
    />
  );
};

export default HtmlContent;
