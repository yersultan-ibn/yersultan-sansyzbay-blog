import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="shadow-[0px_19px_15px_0px_#00000024]">
      <div className="container mx-auto px-10 mb-8 ">
        <div className="flex justify-between items-center py-5">
          <div>
            <Link href="/">
              <p className="text-[#001858] text-[35px] font-semibold">
                Yersultan
                <span className="text-[#6246EA] text-[20px]">.Blog</span>
              </p>
            </Link>
          </div>
          <div>
            <Link href="/" className="text-[18px] mr-10 font-extrabold">
              <span>Главная</span>
            </Link>
            <Link href="/" className="text-[18px] mr-10 font-extrabold">
              <span>Блог</span>
            </Link>
            <Link href="/" className="text-[18px] font-extrabold">
              <span>Ислам</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
