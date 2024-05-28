import { auth, signIn, signOut } from "@/auth";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
} from "@nextui-org/react";
import React from "react";

const NavbarUI = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <Navbar className=" bg-gradient-to-b from-purple-600 to-purple-500 text-white">
      <NavbarBrand>
        <h1 className="font-bold">NEXT AUTH PRISMA TRAINING</h1>
      </NavbarBrand>
      {user && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link className="text-white udner" href="/post/add">
              ADD POST
            </Link>
          </NavbarItem>{" "}
          |
          <NavbarItem>
            <Link className="text-white" href="/posts">
              VIEW POSTS
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        <NavbarItem className="flex gap-2 items-center">
          {!user && (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button type="submit">Sign in</Button>
            </form>
          )}
          {user && (
            <>
              <Avatar
                name={user.name || ""}
                src={user.image || ""}
                showFallback
              />
              <span>{user.name}</span>
            </>
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
              <Button type="submit">Sign Out</Button>
            </form>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarUI;
