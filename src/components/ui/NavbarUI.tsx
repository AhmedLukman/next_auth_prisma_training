"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { Role } from "@/lib/contants";
import PostDropdown from "./PostDropdown";
import { signIn, signOut, useSession } from "next-auth/react";

const NavbarUI = () => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <Navbar className=" bg-gradient-to-b from-purple-600 to-purple-500 text-white">
      <NavbarBrand>
        <Link className="font-bold text-white" href="/">
          NAPT
        </Link>
      </NavbarBrand>
      {user && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <PostDropdown />|
          <NavbarItem>
            <Link className="text-white" href="/posts">
              VIEW POSTS
            </Link>
          </NavbarItem>
          {user.role === Role.Admin && (
            <>
              |
              <NavbarItem>
                <Link className="text-white" href="/users">
                  VIEW USERS
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        <NavbarItem>
          {!user && session.status !== "loading" && (
            <Button onPress={() => signIn()}>Sign in</Button>
          )}
          {user && (
            <Tooltip content={user.name}>
              <Link href={`/users/${user.id}`}>
                <Avatar
                  name={user.name || ""}
                  src={user.image || ""}
                  showFallback
                />
              </Link>
            </Tooltip>
          )}
        </NavbarItem>
        {user && (
          <NavbarItem>
            <Button onPress={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarUI;
