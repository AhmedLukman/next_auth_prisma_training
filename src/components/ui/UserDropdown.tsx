"use client";

import React from "react";

import {
  NavbarItem,
  Button,
  DropdownTrigger,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

const UserDropdown = () => {
  const pathname = usePathname();
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="p-0 text-white bg-transparent data-[hover=true]:bg-transparent"
          >
            USERS
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu>
        <DropdownItem
          as={Link}
          className={
            pathname === "/users" ? "text-white bg-purple-500" : "text-black"
          }
          href="/users"
        >
          View Users
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
