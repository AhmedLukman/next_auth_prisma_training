import React from "react";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import { User as dbUser } from "@prisma/client";
import UserDetailsForm from "./UserDetailsForm";
import { User } from "next-auth";

const UserDetailsPage = ({
  userRecord,
  user,
}: {
  userRecord: dbUser;
  user: User;
}) => {
  const isViewerTheUser = user?.id === userRecord.id;

  return (
    <Card className="max-w-lg sm:mx-auto p-10 mt-20 mx-5">
      <CardHeader className="flex justify-between">
        <h2 className="text-2xl">
          {isViewerTheUser ? "My Profile" : "User profile"}
        </h2>
        <Avatar
          name={userRecord.name || ""}
          src={userRecord.image || ""}
          showFallback
        />
      </CardHeader>
      <CardBody>
        <UserDetailsForm
          user={user}
          isViewerTheUser={isViewerTheUser}
          userRecord={userRecord}
        />
      </CardBody>
    </Card>
  );
};

export default UserDetailsPage;
