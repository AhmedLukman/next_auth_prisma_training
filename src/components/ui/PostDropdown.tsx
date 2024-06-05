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

const PostDropdown = () => {
  const pathname = usePathname();
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button disableRipple className="p-0 text-white bg-transparent">
            POSTS
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu>
        <DropdownItem
          as={Link}
          className={
            pathname === "/posts/add" ? "text-white bg-purple-500" : "text-black"
          }
          href="/posts/add"
        >
          Add Post
        </DropdownItem>
        <DropdownItem
          as={Link}
          className={
            pathname === "/posts" ? "text-white bg-purple-500" : "text-black"
          }
          href="/posts"
        >
          View Posts
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostDropdown;
