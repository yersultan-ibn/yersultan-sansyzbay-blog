import React from "react";

const Row = ({ text, styles }) => {
  return <h3 className={`${styles} border-b-[2px] border-black pb-2 font-medium max-w-max text-3xl text-black border-b-1`}>{text}</h3>;
};

export default Row;
