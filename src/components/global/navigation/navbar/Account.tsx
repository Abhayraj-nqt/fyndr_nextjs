import Link from "next/link";
import React from "react";

import { signOut } from "@/actions/auth.actions";
import { auth } from "@/auth";
import UserAvatar from "@/components/global/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface Props {
  className: string;
}

const Account = async ({ className }: Props) => {
  const session = await auth();

  // const NAV_MENU_ACCOUNT_DROPDOWN: {
  //   login: boolean;
  //   route: string;
  //   label: string;
  // }[] = [
  //   {
  //     login: false,
  //     route: "/sign-in",
  //     label: "Login",
  //   },
  //   {
  //     login: false,
  //     route: "/sign-up",
  //     label: "Register",
  //   },
  //   {
  //     login: true,
  //     route: "",
  //     label: "Account",
  //   },
  //   {
  //     login: true,
  //     route: "",
  //     label: "My Offers",
  //   },
  // ];

  return (
    <Menubar
      className={`relative border-none bg-transparent shadow-none ${className}`}
    >
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer bg-transparent p-0 focus:bg-transparent data-[state=open]:bg-transparent">
          {session?.user?.email ? (
            <UserAvatar
              name={session.user.name!}
              // imageUrl={"https://github.com/shadcn.png"}
            />
          ) : (
            <UserAvatar
              name={"public"}
              imageUrl={"https://github.com/shadcn.png"}
            />
          )}
        </MenubarTrigger>
        {session?.user.email ? (
          <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border bg-white py-2">
            <MenubarItem asChild>
              <Link href={`/account/${session.user.id}`}>Account</Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link href={`/account/${session.user.id}/my-offers`}>
                My Offers
              </Link>
            </MenubarItem>
            <form action={signOut}>
              <Button
                type="submit"
                className="m-0 w-full bg-transparent p-0 font-normal text-dark-100 shadow-none hover:bg-transparent"
              >
                <MenubarItem className="w-full">Logout</MenubarItem>
              </Button>
            </form>
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
