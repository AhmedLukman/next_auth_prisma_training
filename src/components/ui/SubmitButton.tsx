"use client";

import { Button, ThemeColors } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  children,
  color,
}: PropsWithChildren & {
  color:
    | "default"
    | "secondary"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className=" self-end"
      color={color}
      isLoading={pending}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
