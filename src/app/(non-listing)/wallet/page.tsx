import { auth } from "@/auth";
import DefaultCard from "@/components/global/cards/default-card";
import { Separator } from "@/components/ui/separator";

import ActivitySection from "./_components/sections/activity-section";
import WalletSection from "./_components/sections/wallet-section";

const Wallet = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  return (
    <main className="my-10 flex items-center justify-center">
      <DefaultCard className="p-0 xs:w-11/12 lg:w-9/12">
        <h1 className="h3-semibold m-4">Fyndr Wallet</h1>
        <Separator />
        <div className="flex flex-col gap-4 p-4">
          <WalletSection />
          <ActivitySection />
        </div>
      </DefaultCard>
    </main>
  );
};

export default Wallet;
