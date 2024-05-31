import React from "react";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import { User } from "@prisma/client";
import UserDetailsForm from "./UserDetailsForm";

const UserDetailsPage = ({
  userRecord,
  isViewerTheUser,
}: {
  userRecord: User;
  isViewerTheUser: boolean;
}) => {
  return (
    <Card className="max-w-lg mx-auto p-10 mt-20">
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
          isViewerTheUser={isViewerTheUser}
          userRecord={userRecord}
        />
      </CardBody>
    </Card>
  );
};

export default UserDetailsPage;
