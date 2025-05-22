import React, { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import ActivityList from "../activity-list";

type Props = {
  page: number;
  size: number;
};

const ActivitySection = ({ page, size }: Props) => {
  return (
    <div>
      <h2 className="base-medium my-4 px-4">Activity</h2>
      <Separator />
      <Suspense fallback={<p>Loading...</p>}>
        <ActivityList size={size} page={page} />
      </Suspense>
    </div>
  );
};

export default ActivitySection;
