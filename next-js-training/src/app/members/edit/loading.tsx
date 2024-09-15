import { Spinner } from "@nextui-org/react";
import React from "react";

const loading = () => {
  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-115px)]">
        <Spinner color="secondary" labelColor="secondary" label="Loading..." />
      </div>
    </>
  );
};

export default loading;
