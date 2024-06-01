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
import { User } from "@prisma/client";
import SubmitButton from "./SubmitButton";
import { deleteUser } from "@/lib/actions";
import { Role } from "@/lib/contants";

const UsersTable = ({ users }: { users: User[] }) => {
  const formAction = async (id: string) => {
    try {
      const boundDeleteUser = deleteUser.bind(null, id);
      await boundDeleteUser();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <Table
      aria-label="Example static collection table"
      className="max-w-2xl md:mx-auto mx-5"
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn className="text-center">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="flex justify-center">
              {user.role !== Role.Admin && (
                <form action={() => formAction(user.id)}>
                  <SubmitButton color="danger">Delete</SubmitButton>
                </form>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
