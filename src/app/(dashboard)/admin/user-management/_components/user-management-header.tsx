"use client";
import Button from "@/components/global/buttons";
import LocalSearch from "@/components/global/search/local-search";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import AddUser from "./add-user";
import Select from "@/components/global/input/select/index";
const roleOption = [
  { label: "Super admin", value: "SUPER_ADMIN" },
  { label: "Manager", value: "FYNDR_MANAGER" },
  { label: "Support", value: "FYNDR_SUPPORT" },
];
const UserManagementHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
   const searchParams = useSearchParams();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);

  const handleAddUserClick = () => {
    setIsAddUserModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setIsAddUserModalOpen(open);
  };
  const handleRoleChange =(newRole:string[])=>{
    const params = new URLSearchParams(searchParams.toString());
    if (newRole.length > 0) {
      params.set("customerRole", newRole.join(","));
    } else {
      params.delete("customerRole");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex w-1/2 gap-4">
        <LocalSearch
          route={pathname}
          placeholder="Search"
          className="w-1/2 text-[#333] text-left h-[46px] rounded-[10px] "
        />
        <Select className="w-1/2" options={roleOption} placeholder="Role" multi onValueChange={handleRoleChange} />
      </div>

      <Button variant="primary" onClick={handleAddUserClick}>Add User</Button>

      <AddUser open={isAddUserModalOpen} onOpenChange={handleModalClose} />
    </div>
  );
};

export default UserManagementHeader;
