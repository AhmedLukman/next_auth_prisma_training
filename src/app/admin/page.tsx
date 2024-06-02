import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UsersTable from "@/components/ui/UsersTable";
import { Role } from "@/lib/contants";

const AdminPage = async () => {

  const session = await auth()
  const user = session?.user
  if (!user) redirect("/api/auth/signin?callbackUrl=/admin");
  if(user.role !== Role.Admin) redirect("/");

  const users = await prisma.user.findMany({
    include: {
      Post: true,
    },
  });

  return (
    <main>
      <h1 className="mt-10 text-center text-xl mb-5 font-bold">Users</h1>
      <UsersTable users={users} />
    </main>
  );
};

export default AdminPage;
