import React from "react";

import { Separator } from "@/components/ui/separator";

import ActivityList from "../activity-list";

type Props = {
  page: number;
};

const ActivitySection = ({ page }: Props) => {
  return (
    <div>
      <h2 className="base-medium my-4">Activity</h2>
      <Separator />
      <ActivityList page={page} />
    </div>
  );
};

export default ActivitySection;
