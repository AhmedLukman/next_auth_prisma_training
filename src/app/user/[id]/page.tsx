import { auth } from "@/auth";
import UserDetailsPage from "@/components/ui/UserDetailsPage";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import React, { cache } from "react";

const getUserRecord = cache(async (id: string) => {
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
  const userRecord = await getUserRecord(id);
  return {
    title: userRecord?.name,
  };
};

const UserDetailsFetchPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await auth();
  if (!session?.user) redirect(`/api/auth/signin?callbackUrl=/user/${id}`);

  const userRecord = await getUserRecord(id);
  if (!userRecord) notFound();

  const isViewerTheUser = session.user?.id === userRecord.id;

  return (
    <UserDetailsPage
      userRecord={userRecord}
      isViewerTheUser={isViewerTheUser}
    />
  );
};

export default UserDetailsFetchPage;
