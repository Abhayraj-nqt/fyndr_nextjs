// "use client"

import ContainerWrapper from "@/components/global/ContainerWrapper";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MultiSelectDropdown } from "@/components/ui/multiselect";
import {
  Table,
  TableFooter,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableCaption,
} from "@/components/ui/table";
// import React, { useState } from "react";

const page = () => {
  // const[selectedStatus, setSelectedStatus]= useState<string[]>([]);
 interface User {
  name: string;
  businessName: string;
  address: string;
  phone: string;
  date?: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  role: string;
}



const users: User[] = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Business",
    businessName: "Businessname1",
    phone: "34567890",
    address: "asdfg",
    status: "ACTIVE",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Business",
    businessName: "businessName 2",
    phone: "34567890",
    address: "asdfg",
    status: "ACTIVE",
  },
  {
    name: "Cathy Brown",
    email: "cathy@example.com",
    role: "Individual",
    businessName: "N/A",
    phone: "34567890",
    address: "asdfg",
    status: "ACTIVE",
  },
]

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Deleted", value: "DELETED" },
];
  return (
    <ContainerWrapper title="User details">
      <div className="flex-center gap-2">
        <Input placeholder="Search" />
        <Input placeholder="Status"  />
        <Input placeholder="Customer"  />
        <Input placeholder="Date"  />
        <Input placeholder="Promo codes"  />
        <Input placeholder="Country" />
        <Input placeholder="State"  />
        <Input placeholder="Channel" />
      </div>
      
      <div className="py-6 flex gap-6">
        <p className="font-medium text-base leading-[22px] text-[rgb(37,124,219)]">Total Registered Users: 3</p>
        <div className="flex-center  gap-2">
        <div className="bg-[rgb(157,209,163)] h-[18px] w-[18px] rounded-[50rem]"></div>
        <p>Business</p>
        </div>
        <div className="flex-center gap-2">
        <div className="bg-[rgb(145,189,236)] h-[18px] w-[18px] rounded-[50rem]"></div>
        <p>Individual</p>
        </div>
      </div>
      <Table className="rounded-[10px] overflow-hidden">
        <TableHeader >
          <TableRow className="bg-[#3f9af8] text-[#ffffff] border">
            <TableHead className="text-[#ffffff]">Name</TableHead>
            <TableHead className="text-[#ffffff]">Email</TableHead>
            <TableHead className="text-[#ffffff]">Role</TableHead>
            <TableHead className="text-[#ffffff]">Business Name</TableHead>
            <TableHead className="text-[#ffffff]">Phone</TableHead>
            <TableHead className="text-[#ffffff]">Address</TableHead>
            <TableHead className="text-[#ffffff]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow className="border-b-0" key={index}>
              <TableCell className="border-r-2 border-r-[#D3D6E0]">
                <div className="bg-[rgb(157,209,163)] absolute w-[7px] h-full rounded-tr-[10px] rounded-br-[10px] left-0 top-0"></div>
                {user.name}
                </TableCell>
              <TableCell className="border-r-2 border-r-[#D3D6E0]">{user.email}</TableCell>
              <TableCell className="border-r-2 border-r-[#D3D6E0]">{user.role}</TableCell>
              <TableCell className="border-r-2 border-r-[#D3D6E0]">{user.businessName || "-"}</TableCell>
              <TableCell className="border-r-2 border-r-[#D3D6E0]">{user.phone}</TableCell>
              <TableCell className="border-r-2 border-r-[#D3D6E0]">{user.address}</TableCell>
              <TableCell className="border-r-2 border-r-[#D3D6E0]">{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ContainerWrapper>
  );
};

export default page;
