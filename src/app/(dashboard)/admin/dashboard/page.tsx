import {
  getCampaignsStatistics,
  getCustomerStatistics,
  getRevenueStatistics,
} from "@/actions/admin.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AdminDashboard = async () => {
  const { success: campaignSuccess, data: campaignData } =
    await getCampaignsStatistics();
  const { success: userSuccess, data: userData } =
    await getCustomerStatistics();
  const { success: revenueSuccess, data: revenueData } =
    await getRevenueStatistics();
  if (!campaignSuccess || !userSuccess || !revenueSuccess) return;
  const campaignStats = [
    { label: "Total Active Campaigns", value: campaignData?.data?.active },
    { label: "Online", value: campaignData?.data?.online },
    { label: "In-Store", value: campaignData?.data?.instore },
    { label: "Online & In-Store", value: campaignData?.data?.all },
  ];
  const userStats = [
    { label: "Total Enrollments", value: userData?.data?.user },
    { label: "Total Individual", value: userData?.data?.customer },
    { label: "Total Business", value: userData?.data?.merchant },
  ];
  const revenueStats = [
    { label: "Total Revenue", value: revenueData?.data?.totalRevenue },
    { label: "Offer Revenue", value: revenueData?.data?.offerRevenue },
    { label: "Catalogue Revenue", value: revenueData?.data?.catalogueRevenue },
    {
      label: "Interaction Revenue",
      value: revenueData?.data?.interactionRevenue,
    },
    { label: "Events Revenue", value: revenueData?.data?.eventsRevenue },
  ];

  return (
    <div className="p-[2rem] h-[100%] ">
      <Input disabled={true} value="US" className="w-[50%] rounded-[30px]" />
      <div className="grid grid-cols-2 gap-6 my-6 px-[6rem] py-[2rem]">
        <Card className="p-4 shadow-[0.25rem_0.25rem_1rem_#0000002b] rounded-[2rem] ">
          <CardContent className="p-0 text-[#3f9af7]">Campaign</CardContent>
          <Separator className="bg-[#3f9af7] my-2" />
          {campaignStats.map((item, index) => (
            <CardContent className="p-0 text-sm" key={index}>
              <div className="flex justify-between py-1">
                <p>{item.label}</p>
                <p>{item.value}</p>
              </div>
            </CardContent>
            
          ))}
        </Card>

        <Card className="p-4 shadow-[0.25rem_0.25rem_1rem_#0000002b] rounded-[2rem]">
          <CardContent className="p-0 text-[#3f9af7]">Customers</CardContent>
          <Separator className="bg-[#3f9af7] my-2" />
          {userStats.map((item, index) => (
            <CardContent className="p-0 text-sm" key={index}>
              <div className="flex justify-between py-1">
                <p>{item.label}</p>
                <p>{item.value}</p>
              </div>
            </CardContent>
          ))}
        </Card>

        <Card className="p-4 shadow-[0.25rem_0.25rem_1rem_#0000002b] rounded-[2rem]">
          <CardContent className="p-0 text-[#3f9af7]">Revenue</CardContent>
          <Separator className="bg-[#3f9af7] my-2" />
          {revenueStats.map((item, index) => (
            <CardContent className="p-0 text-sm" key={index}>
              <div className="flex justify-between py-1">
                <p>{item.label}</p>
                <p>
                  {revenueData?.data?.currencySymbol}
                  {item.value}
                </p>
              </div>
            </CardContent>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
