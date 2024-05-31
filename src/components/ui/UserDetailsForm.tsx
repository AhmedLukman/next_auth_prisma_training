'use client'

import React, { FormEvent, useEffect, useRef, useState } from "react";
import DateInputUI from "@/components/ui/DateInputUI";
import { Button, Input } from "@nextui-org/react";
import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";

// Uses onSubmit to handle submission of form data and error states to display error messages

const UserDetailsForm = ({
  isViewerTheUser,
  userRecord,
}: {
  isViewerTheUser: boolean;
  userRecord: User;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const usernameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setUsernameError("");
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
        else alert("Failed to update profile: " + errorObj.message);
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
    <form onSubmit={handleSubmit}>
      <Input
        ref={usernameInputRef}
        type="text"
        variant="underlined"
        required
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
    </form>
  );
};

export default UserDetailsForm;
