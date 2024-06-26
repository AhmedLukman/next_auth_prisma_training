"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Post, User } from "@prisma/client";
import SubmitButton from "./SubmitButton";
import { deleteUser } from "@/lib/actions";
import { Role } from "@/lib/contants";
import { Button, Link } from "@nextui-org/react";

const UsersTable = ({
  users,
}: {
  users: ({
    Post: Post[];
  } & User)[];
}) => {
  const formAction = async (id: string) => {
    try {
      const boundDeleteUser = deleteUser.bind(null, id);
      await boundDeleteUser();
      alert("User deleted successfully");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <Table
      aria-label="Users Table"
      className="sm:max-w-2xl sm:mx-auto px-5"
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>NO. OF POSTS</TableColumn>
        <TableColumn >ROLE</TableColumn>
        <TableColumn >ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.Post.length}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="space-y-2">
              {user.role !== Role.Admin && (
                <form action={() => formAction(user.id)}>
                  <SubmitButton size="sm" color="danger">
                    Delete
                  </SubmitButton>
                </form>
              )}
              <Button size="sm" as={Link} href={`/users/${user.id}`}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
