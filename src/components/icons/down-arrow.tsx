import React from "react";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const DownArrow = ({ color = "#257CDB", height = 11, width = 19 }: Props) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 19 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.25 1.25L11.2526 9.05571C10.4227 9.98143 9.07726 9.98143 8.2474 9.05571L1.25 1.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DownArrow;
