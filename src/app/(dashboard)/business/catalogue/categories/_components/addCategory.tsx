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
        onClick={() => router.push(ROUTES.STORE_ADD_CATEGORY)}
      >
        Add Category
      </Button>
    </>
  );
};

export default AddCategory;
