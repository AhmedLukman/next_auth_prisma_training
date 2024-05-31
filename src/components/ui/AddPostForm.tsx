"use client";

import React from "react";
import SubmitButton from "@/components/ui/SubmitButton";
import { Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { addPost } from "@/lib/actions";

export const initialAddPostFormState = { titleError: "", contentError: "", dbError: "" };

// Uses form state to handle submission of form data and error states

const AddPostForm = () => {
  const [{titleError, contentError, dbError}, formAction] = useFormState(addPost, initialAddPostFormState);
  return (
    <form className="flex flex-col " action={formAction}>
      <Input
        className="mb-5"
        type="text"
        name="title"
        variant="underlined"
        label="Enter post title"
        errorMessage={titleError}
        isInvalid={!!titleError}
      />
      <Input
        className="mb-10"
        type="text"
        name="content"
        variant="underlined"
        label="Enter post content"
        errorMessage={contentError}
        isInvalid={!!contentError}
      />
      <SubmitButton color="secondary">Add post</SubmitButton>
     {dbError && <p className="mt-5 text-red-500">{dbError}</p>}
    </form>
  );
};

export default AddPostForm;
