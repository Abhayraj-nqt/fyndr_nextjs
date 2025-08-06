import React from "react";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const DownArrow = ({ color = "#257CDB", height = 11, width = 19 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6667 6.66669L10.8355 13.1714C10.1439 13.9429 9.02272 13.9429 8.33117 13.1714L2.5 6.66669"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DownArrow;
