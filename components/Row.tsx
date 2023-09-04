import React from "react";

interface RowProps {
  text: string;
  styles: string;
}

const Row: React.FC<RowProps> = ({ text, styles }): JSX.Element => {
  return (
    <h3
      className={`${styles} border-b-[2px] border-black dark:border-white pb-2 font-medium max-w-max sm:text-3xl text-[19px] light:text-black border-b-1`}
    >
      {text}
    </h3>
  );
};

export default Row;
