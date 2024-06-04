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

const PostDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="p-0 text-white bg-transparent data-[hover=true]:bg-transparent"
          >
            POSTS
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu>
        <DropdownItem as={Link} className="text-black" href="/posts/add">
          Add Post
        </DropdownItem>
        <DropdownItem as={Link} className="text-black" href="/posts">
          View Posts
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostDropdown;
