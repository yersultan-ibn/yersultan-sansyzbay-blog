import { skills } from "@/constants";
import React from "react";

const Footer = () => {
  const columns = [];
  const columnSize = Math.ceil(skills.length / 4);

  for (let i = 0; i < 4; i++) {
    columns.push(skills.slice(i * columnSize, (i + 1) * columnSize));
  }
  return (
    <div className="md:pt-20 pt-10 bg-black text-white">
      <h4 className="text-center text-[28px] uppercase font-extrabold">
        My Tech Stack
      </h4>
      <div className="w-[70%] mx-auto mt-10 md:text-[20px] ">
        <div className="md:flex grid grid-cols-2 justify-between uppercase font-bold">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((skill, index) => (
                <p key={skill} className={`text-center md:mb-3 md:border-none border-b border-white py-2`}>
                  {skill}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <a href="https://t.me/yersultan_ibn">
        <div className="flex bg-[#1c1c1c] justify-center md:mt-20 mt-10 py-10 pb-8">
          <div className="">
            <div className="flex">
              <p className="mr-2"> Contact me on Telegram</p>
              <img src="/telegram.svg" alt="telegram" />
            </div>
            <p className="text-[#717171] text-center mt-3">@Yersultan</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Footer;
