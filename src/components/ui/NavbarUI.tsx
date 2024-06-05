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
  cn,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Divider,
} from "@nextui-org/react";
import React, { useState } from "react";
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Add Post",
      href: "/posts/add",
    },
    {
      label: "View Posts",
      href: "/posts",
    },
    {
      label: "View Users",
      href: "/users",
    },
  ];

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
    <Navbar
      className={cn(
        " bg-gradient-to-b from-purple-600 to-purple-500 text-white",
        {
          " bg-gradient-to-r from-red-500 to-blue-500 animate-gradient-x":
            isLoading,
          "bg-gradient-to-b from-red-600 to-red-500": isAdmin,
        }
      )}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
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
          <NavbarItem className=" hidden sm:block">
            <Button onPress={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </Button>
          </NavbarItem>
        )}
        {user && (
          <NavbarItem className=" hidden sm:block">
            <Button
              color="secondary"
              onPress={!isAdmin ? handleBeAdminClick : handleRemoveAdminClick}
            >
              {!isAdmin ? "Be Admin" : "Remove Admin"}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.slice(0, -1).map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="foreground" className="w-full" href={item.href}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        {isAdmin &&
          menuItems.slice(-1).map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" className="w-full" href={item.href}>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        <Divider className="my-2" />
        {user && (
          <NavbarItem>
            <Button onPress={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </Button>
          </NavbarItem>
        )}
        {user && (
          <NavbarItem>
            <Button
              color="secondary"
              onPress={!isAdmin ? handleBeAdminClick : handleRemoveAdminClick}
            >
              {!isAdmin ? "Be Admin" : "Remove Admin"}
            </Button>
          </NavbarItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarUI;
