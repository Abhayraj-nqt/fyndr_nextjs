"use client";
import Button from "@/components/global/buttons";
import { MultiSelect } from "@/components/global/multiselect-dropdown/multiselectDropdown";
import LocalSearch from "@/components/global/search/local-search";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import AddUser from "./add-user";

const roleOption = [
  { label: "Super admin", value: "SUPER_ADMIN" },
  { label: "Manager", value: "FYNDR_MANAGER" },
  { label: "Support", value: "FYNDR_SUPPORT" },
];
const UserManagementHeader = () => {
  const pathname = usePathname();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);

  const handleAddUserClick = () => {
    setIsAddUserModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setIsAddUserModalOpen(open);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex w-1/2 gap-4">
        <LocalSearch
          route={pathname}
          placeholder="Search"
          className="w-1/2 text-[#333] text-left h-[46px] rounded-[10px] pl-0"
        />
        <MultiSelect
          placeholder="Role"
          options={roleOption}
          paramKey="customerRole"
          className="w-1/2 rounded-[10px]"
        />
      </div>

      <Button variant="primary" onClick={handleAddUserClick}>Add User</Button>

      <AddUser open={isAddUserModalOpen} onOpenChange={handleModalClose} />
    </div>
  );
};

export default UserManagementHeader;
