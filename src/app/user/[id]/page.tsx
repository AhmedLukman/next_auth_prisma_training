import { auth } from "@/auth";
import DateInputUI from "@/components/ui/DateInputUI";
import prisma from "@/lib/prisma";
import { Avatar, Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { notFound, redirect } from "next/navigation";
import React, { cache } from "react";

const getUser = cache(async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
});

export const generateStaticParams = async () => {
  const users = await prisma.user.findMany();
  return users.map((user) => ({ params: { id: user.id.toString() } }));
};

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const user = await getUser(id);
  return {
    title: user?.name,
  };
};

const UserDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const user = await getUser(id);
  if (!user) notFound();

  const session = await auth();
  if (!session?.user) redirect(`/api/auth/signin?callbackUrl=/user/${id}`);

  const isViewerTheUser = session.user.id === user.id;

  return (
    <Card className="max-w-xl mx-auto p-10 mt-20">
      <CardHeader className="flex justify-between">
        <div className="flex gap-5 items-center">
          <h2 className="text-2xl">
            {isViewerTheUser ? "My Profile" : "User profile"}
          </h2>
          {isViewerTheUser && <Button variant="flat">Edit</Button>}
        </div>
        <Avatar name={user.name || ""} src={user.image || ""} showFallback />
      </CardHeader>
      <CardBody>
        <Input
          type="text"
          variant="underlined"
          defaultValue={user.name || ""}
          label="Username"
          disabled
        />
        <Input
          type="email"
          variant="underlined"
          defaultValue={user.email}
          label="Email"
          disabled
        />
        <DateInputUI date={user.createdAt} />
      </CardBody>
    </Card>
  );
};

export default UserDetailsPage;
