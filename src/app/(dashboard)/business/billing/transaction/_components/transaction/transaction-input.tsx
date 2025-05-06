"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const TransactionInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const initialValue = searchParams.get("search");
    if (initialValue) setInputValue(initialValue);
  }, [searchParams]);

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateQuery(inputValue);
    }
  };

  return (
    <Input
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className="pr-10 h-11 rounded-lg border border-gray-300"
      placeholder="Search"
    />
  );
};

export default TransactionInput;
