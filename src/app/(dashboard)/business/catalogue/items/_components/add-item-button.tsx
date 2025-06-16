"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const AddItem = () => {
  const router = useRouter();
  return (
    <>
      <Button
        className="btn-primary"
        onClick={() => router.push(ROUTES.BUSINESS_STORE_ITEM_CREATE)}
      >
        Add Item
      </Button>
    </>
  );
};

export default AddItem;
