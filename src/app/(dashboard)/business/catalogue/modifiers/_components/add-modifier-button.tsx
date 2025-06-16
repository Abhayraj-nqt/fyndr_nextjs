"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const AddModifier = () => {
  const router = useRouter();
  return (
    <>
      <Button
        className="btn-primary"
        onClick={() => router.push(ROUTES.BUSINESS_STORE_MODIFIER_CREATE)}
      >
        Add Modifier
      </Button>
    </>
  );
};

export default AddModifier;
