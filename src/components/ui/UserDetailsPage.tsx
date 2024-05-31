"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@nextui-org/react";
import DateInputUI from "@/components/ui/DateInputUI";
import { User } from "@prisma/client";
import { Session } from "next-auth";
import { updateProfile } from "@/lib/actions";

const UserDetailsPage = ({
  userRecord,
  session,
}: {
  userRecord: User;
  session: Session;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [dbError, setDbError] = useState("");

  const usernameInputRef = useRef<HTMLInputElement>(null);

  const isViewerTheUser = session.user?.id === userRecord.id;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setUsernameError("");
    setDbError("");

    if (usernameInputRef.current!.value === userRecord.name) {
      setIsEditing(false);
      return;
    }
    setIsLoading(true);

    try {
      await updateProfile({
        username: usernameInputRef.current!.value,
      });
      setIsEditing(false);
      alert("Profile successfully updated");
    } catch (error) {
      if (error instanceof Error) {
        const errorObj = JSON.parse(error.message) as {
          field: string;
          message: string;
        };
        if (errorObj.field === "username") setUsernameError(errorObj.message);
        else setDbError(errorObj.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isEditing) {
      usernameInputRef.current?.focus();
    }
  }, [isEditing]);

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
        <form onSubmit={handleSubmit}>
          <Input
            ref={usernameInputRef}
            type="text"
            variant="underlined"
            defaultValue={userRecord.name || ""}
            label="Username"
            disabled={!isEditing}
            isInvalid={!!usernameError}
            errorMessage={usernameError}
          />
          <Input
            type="email"
            variant="underlined"
            defaultValue={userRecord.email}
            label="Email"
            isDisabled
          />
          <DateInputUI date={userRecord.createdAt} />
          {isViewerTheUser && !isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="mt-8 w-full"
              variant="flat"
              color="default"
            >
              Edit
            </Button>
          )}

          {isViewerTheUser && isEditing && (
            <Button
              type="submit"
              className="mt-8 w-full"
              variant="solid"
              isLoading={isLoading}
              color="secondary"
            >
              Apply
            </Button>
          )}
          {dbError && <p className="text-red-500">{dbError}</p>}
        </form>
      </CardBody>
    </Card>
  );
};

export default UserDetailsPage;
