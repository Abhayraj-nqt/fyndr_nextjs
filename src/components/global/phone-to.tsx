import Link from "next/link";
import React from "react";

type Props = {
  phone: string;
  children: React.ReactNode;
};

const PhoneTo = ({ phone, children }: Props) => {
  return <Link href={`tel:${phone}`}>{children}</Link>;
};

export default PhoneTo;
