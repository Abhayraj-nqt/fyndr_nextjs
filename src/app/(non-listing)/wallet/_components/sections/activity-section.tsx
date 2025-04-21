import React from "react";

import { Separator } from "@/components/ui/separator";

const ActivitySection = () => {
  return (
    <div>
      <h2 className="base-medium my-4">Activity</h2>
      <Separator />
      <div className="mt-6">No activity yet</div>
    </div>
  );
};

export default ActivitySection;
