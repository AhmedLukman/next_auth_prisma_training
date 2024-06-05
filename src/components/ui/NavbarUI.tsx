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
import PostDropdown from "./PostDropdown";
import { signIn, signOut, useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";
import { Role } from "@prisma/client";
import { beAdmin, removeAdmin } from "@/lib/actions";

const NavbarUI = () => {
  const session = useSession();
  const user = session.data?.user;
  const role = session.data?.user.role;
  const isAdmin = role === Role.ADMIN;
  const isLoading = session.status === "loading";

  const handleBeAdminClick = async () => {
    try {
      await beAdmin(user!.id!);
      alert("You are now an admin!");
      session.update();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleRemoveAdminClick = async () => {
    try {
      await removeAdmin(user!.id!);
      alert("You are no longer an admin!");
      session.update();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <Navbar className=" bg-gradient-to-b from-purple-600 to-purple-500 text-white">
      <NavbarBrand>
        <Link className="font-bold text-white" href="/">
          NAPT
        </Link>
      </NavbarBrand>
      {user && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <PostDropdown />
          </NavbarItem>
          {isAdmin && (
            <>
              |
              <NavbarItem>
                <UserDropdown />
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        <NavbarItem>
          {!user && !isLoading && (
            <Button onPress={() => signIn()}>Sign in</Button>
          )}
          {user && (
            <Tooltip content={isLoading ? "Loading..." : user.name}>
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
        {user &&  
          <Button color="secondary" onPress={!isAdmin ? handleBeAdminClick : handleRemoveAdminClick}>
            {!isAdmin ? 'Be Admin' : 'Remove Admin'}
          </Button>
        }
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarUI;
