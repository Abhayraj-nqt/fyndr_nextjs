import React from "react";

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
      <ActivityList size={size} page={page} />
    </div>
  );
};

export default ActivitySection;
