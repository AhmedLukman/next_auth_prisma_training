import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import React from "react";

const NavbarUI = () => {
  return (
    <Navbar className=" bg-gradient-to-b from-purple-600 to-purple-500 text-white">
      <NavbarBrand>
        <h1 className="font-bold">NEXT AUTH PRISMA TRAINING</h1>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="text-white udner" href="#">
            ADD POST
          </Link>
        </NavbarItem> |
        <NavbarItem>
          <Link className="text-white" href="#">
            VIEW POSTS
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-white">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="#">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarUI;
