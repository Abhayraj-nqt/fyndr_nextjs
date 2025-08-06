"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const AddCategory = () => {
  const router = useRouter();
  return (
    <>
      <Button
        className="btn-primary"
        onClick={() => router.push(ROUTES.BUSINESS_STORE_CATEGORY_CREATE)}
      >
        Add Category
      </Button>
    </>
  );
};

export default AddCategory;
