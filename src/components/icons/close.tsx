import React from "react";

type Props = {
  className?: string;
  size?: string | number;
  color?: string;
};

const Close = ({ className, size = 24, color = "#394878" }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.4545 14.4545L12 12M12 12L9.54545 9.54545M12 12L9.54545 14.4545M12 12L14.4545 9.54545M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Close;
