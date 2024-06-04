import { Spinner } from "@nextui-org/react";
import React from "react";

const loading = () => {
  return (
    <div className="inset-0 absolute flex justify-center items-center">
      <Spinner color="secondary"/>
    </div>
  );
};

export default loading;
