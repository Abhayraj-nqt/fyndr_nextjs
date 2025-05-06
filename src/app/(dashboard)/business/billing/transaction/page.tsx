"use server";

import ContainerWrapper from "@/components/global/ContainerWrapper";
import Summary from "./_components/summary/index";
import { RouteParams } from "@/types/global";
import { auth } from "@/auth";
import { getAccountAPI } from "@/actions/auth.actions";
import Transaction from "./_components/transaction";

const BusinessPage = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
  const { month, months, status, channel, search } = await searchParams;
  const session = await auth();
  const email = session?.user.email;
  const token = session?.accessToken;
  if (!email) throw new Error("Email is required");
  if (!token) throw new Error("Session expired!!");

  const { success, data } = await getAccountAPI({
    email,
    regMode: "facebook",
    accessToken: token,
  });

  if (!success || !data) return null;
  const { bizid, indvid } = data;
  if (!bizid) return null;

  return (
    <>
      <div className="w-[90%] max-w-screen-xl mx-auto space-y-4 ">
        <ContainerWrapper title="My Order" noPadding>
          <Summary month={month} bizid={bizid} />
        </ContainerWrapper>
        <ContainerWrapper>
          <Transaction
            bizid={bizid}
            months={months}
            status={status}
            channel={channel}
            indvid={indvid}
            search={search}
          />
        </ContainerWrapper>
      </div>
    </>
  );
};

export default BusinessPage;
