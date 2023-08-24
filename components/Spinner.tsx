import React from "react";
const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      {" "}
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-opacity-50"></div>{" "}
    </div>
  );
};
export default Spinner;
