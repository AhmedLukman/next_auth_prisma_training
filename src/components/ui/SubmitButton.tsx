"use client";

import { Button } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const {pending} = useFormStatus();
  return (
    <Button type="submit" className=" self-end" color="secondary" isLoading={pending}>
      {children}
    </Button>
  );
};

export default SubmitButton;
