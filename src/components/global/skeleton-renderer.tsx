import React from "react";

type Props = {
  skeleton: React.ReactNode;
  count: number;
  className?: string;
};

const SkeletonRenderer = ({ skeleton, count = 1, className = "" }: Props) => {
  return (
    <div className={`flex flex-1 flex-wrap gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={i}>{skeleton}</React.Fragment>
      ))}
    </div>
  );
};

export default SkeletonRenderer;
