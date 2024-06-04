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

const UserDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="p-0 text-white bg-transparent data-[hover=true]:bg-transparent"
          >
            USER
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu>
        <DropdownItem as={Link} className="text-black" href="/users">
          View Users
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
