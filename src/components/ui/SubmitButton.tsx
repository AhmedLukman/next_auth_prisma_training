"use client";

import { Button, ThemeColors } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  children,
  color,
  className
}: PropsWithChildren & {
  color?:
    | "default"
    | "secondary"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
    className?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      // className=" self-end"
      className={className}
      color={color}
      isLoading={pending}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
