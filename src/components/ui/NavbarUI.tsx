import { signIn, signOut } from "@/auth";
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
import { cachedAuth } from "@/lib/util";
import React from "react";
import SubmitButton from "./SubmitButton";
import { Role } from "@/lib/contants";

const NavbarUI = async () => {
  const session = await cachedAuth();
  const user = session?.user;
  return (
    <Navbar className=" bg-gradient-to-b from-purple-600 to-purple-500 text-white">
      <NavbarBrand>
        <Link className="font-bold text-white" href="/">
          NEXT AUTH PRISMA TRAINING
        </Link>
      </NavbarBrand>
      {user && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link className="text-white" href="/posts/add">
              ADD POST
            </Link>
          </NavbarItem>
          |
          <NavbarItem>
            <Link className="text-white" href="/posts">
              VIEW POSTS
            </Link>
          </NavbarItem>
          {user?.role === Role.Admin && (
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
          {!user && (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <Button type="submit">Sign in</Button>
            </form>
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
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <SubmitButton>Sign Out</SubmitButton>
            </form>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarUI;
