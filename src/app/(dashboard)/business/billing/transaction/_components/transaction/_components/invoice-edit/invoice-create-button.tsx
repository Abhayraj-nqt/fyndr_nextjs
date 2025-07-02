"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/global/buttons";

const BUSINESS_ACCOUNT_CREATE_INVOICE = "/business/invoice";

const InvoiceCreateButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(BUSINESS_ACCOUNT_CREATE_INVOICE);
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Create Invoice
    </Button>
  );
};

export default InvoiceCreateButton;
