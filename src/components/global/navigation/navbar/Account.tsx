import Link from "next/link";

import { auth } from "@/auth";
import UserAvatar from "@/components/global/user-avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import SignOutButton from "../../buttons/sign-out-button";
import { findPathForAccount } from "@/lib/utils";

interface Props {
  className: string;
}

const Account = async ({ className }: Props) => {
  const session = await auth();

  return (
    <Menubar
      className={`relative border-none bg-transparent shadow-none ${className}`}
    >
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer bg-transparent p-0 focus:bg-transparent data-[state=open]:bg-transparent">
          {session?.user?.email ? (
            <UserAvatar
              name={session.user?.name}
              // imageUrl={"https://github.com/shadcn.png"}
            />
          ) : (
            <UserAvatar
              name={"public"}
              imageUrl={"https://github.com/shadcn.png"}
            />
          )}
        </MenubarTrigger>
        {session?.user?.email ? (
          <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border bg-white py-2">
            <MenubarItem asChild>
              <Link href={findPathForAccount(session.user.entityType)}>Account</Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link href={`/account/${session.user.id}/my-offers`}>
                My Offers
              </Link>
            </MenubarItem>
            <MenubarItem className="w-full">
              <SignOutButton className="m-0 size-fit w-full justify-start bg-transparent p-0 font-normal text-black shadow-none hover:bg-transparent">
                Logout
              </SignOutButton>
            </MenubarItem>
          </MenubarContent>
        ) : (
          <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border bg-white py-2">
            <MenubarItem asChild>
              <Link href={"/sign-in"}>Login</Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link href={"/sign-up"}>Register</Link>
            </MenubarItem>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
};

export default Account;
