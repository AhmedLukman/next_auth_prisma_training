"use client";

import { Button, ThemeColors } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  children,
  color,
  className,
  size,
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
  size?: "sm" | "md" | "lg" | undefined;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size={size}
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
