import { cachedAuth } from "@/lib/util";
import UserDetailsPage from "@/components/ui/UserDetailsPage";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import React, { cache } from "react";

const getUserRecord = cache(async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
});

//  ~ brings server error in production mode, see into it later ~
// export const generateStaticParams = async () => {
//   const users = await prisma.user.findMany();
//   return users.map((user) => ({ params: { id: user.id } }));
// };

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
  const session = await cachedAuth();
  const user = session?.user;
  if (!user) redirect(`/api/auth/signin?callbackUrl=/users/${id}`);

  const userRecord = await getUserRecord(id);
  if (!userRecord || !userRecord.id) notFound();

  return <UserDetailsPage userRecord={userRecord} user={user} />;
};

export default UserDetailsFetchPage;
