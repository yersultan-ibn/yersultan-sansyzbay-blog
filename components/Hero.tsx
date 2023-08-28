import React from "react";
import { TypeWriter } from ".";
const hats = [
  {
    prep: "a",
    suffix: "Сансызбая Ерсултана",
  },
  {
    prep: "a",
    suffix: "UI/UX Designer",
  },
  {
    prep: "a",
    suffix: "Graphics Designer",
  },
];
const Hero = () => {
  return (
    <div>
      <div>
        <h1>Добро пожаловать на офицальный сайт</h1>
        {/* <h1
          className="relative w-[max-content] font-mono 
before:absolute before:inset-0 before:animate-typewriter before:bg-white 
after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-[#f1cf71] bg-black text-[#f1cf71] px-3 py-1 text-[50px] text-center"
        >
          Сансызбая Ерсултана
        </h1> */}
        <span class="type-fruit text-lg text-rose-500">
          Сансызбая Ерсултана
        </span>
        <TypeWriter hats={hats} />
      </div>
    </div>
  );
};

export default Hero;
