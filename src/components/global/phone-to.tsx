// import Link from "next/link";
import React from "react";

import { Modal } from "./modal";

type Props = {
  phone: string;
  children: React.ReactNode;
};

const PhoneTo = ({ phone, children }: Props) => {
  // return <Link href={`tel:${phone}`}>{children}</Link>;
  return (
    <>
      <Modal trigger={children} title={"Call us"} bodyClassName="flex-center">
        <p className="title-5 text-primary">{phone}</p>
      </Modal>
    </>
  );
};

export default PhoneTo;
