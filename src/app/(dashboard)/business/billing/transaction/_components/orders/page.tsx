import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import { Suspense } from "react";

import { onGetOrdersDetails } from "@/actions/transaction.action";
import { auth } from "@/auth";
import DefaultCard from "@/components/global/cards/default-card";
import LocalSearch from "@/components/global/search/local-search";
import ROUTES from "@/constants/routes";
import { RouteParams } from "@/types/global";

import OrdersTable from "./_components/orders-table";

import SelectPayment from "./_components/select-orders/select-payment";

import SelectDelivery from "./_components/select-orders/select-delivery";

import Input from "@/components/global/input";

const Orders = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const session = await auth();
  const bizid = session?.user.bizid;
  const params = await searchParams;
  const query = typeof params?.query === "string" ? params.query : "";

  console.log("🔍 Raw params received:", params);

  const searchParamsCache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    paymentstatus: parseAsArrayOf(parseAsString).withDefault([]),
    deliverystatus: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const search = searchParamsCache.parse(params);

  console.log("📄 Parsed search params:", search);
  console.log("🎯 Final page value being sent to API:", search?.page);
  const selectedPyamentStatus = search.paymentstatus;
  const selectedDeliveryStatus = search.deliverystatus;

  const promises = Promise.all([
    onGetOrdersDetails(
      {
        page: search?.page || 1,
        pageSize: search?.pageSize || 10,
        businessId: bizid,
      },
      {
        deliveryStatus: selectedDeliveryStatus,
        invoicedTo: query,
        orderEndDt: "",
        orderStartDt: "",
        paymentStatus: selectedPyamentStatus,
      }
    ),
  ]);

  return (
    <div className="min-h-screen ">
      <DefaultCard>
        <div className="flex">
          <LocalSearch
            placeholder="Search by name"
            route={ROUTES.BUSINESS_DASHBOARD}
            icon={"/images/aboutus/home-search-icon.svg"}
            className="w-12"
          />

          <SelectPayment />
          <SelectDelivery />
          <Input type="date" />
        </div>
        <section className="mt-10">
          <Suspense fallback={<div>Loading orders...</div>}>
            <OrdersTable promises={promises} />
          </Suspense>
        </section>
      </DefaultCard>
    </div>
  );
};

export default Orders;
