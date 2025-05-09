import { auth } from "@/auth";
import DefaultCard from "@/components/global/cards/default-card";
import { Separator } from "@/components/ui/separator";
import { RouteParams } from "@/types/global";

import ActivitySection from "./_components/sections/activity-section";
import WalletSection from "./_components/sections/wallet-section";

const Wallet = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const { page = 1 } = await searchParams;

  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  return (
    <main className="my-6 flex items-center justify-center p-4">
      <DefaultCard className="max-w-screen-xl p-0 lg:w-11/12 xl:w-9/12">
        <h1 className="h3-semibold m-4">Fyndr Wallet</h1>
        <Separator />
        <div className="flex flex-col gap-4 p-4">
          <WalletSection />
          <ActivitySection page={Number(page) || 1} />
        </div>
      </DefaultCard>
    </main>
  );
};

export default Wallet;
