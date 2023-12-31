"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/services";
import { useTheme } from "next-themes";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaSearch,
  FaSun,
  FaRegMoon,
} from "react-icons/fa";

interface Category {
  name: string;
  slug: string;
}

const Header: React.FC = (props): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <>
      <div className="light:bg-[#f9f8f4] shadow-[0px_19px_15px_0px_#00000024]">
        <div className="container mx-auto lg:px-0 px-10 mb-8">
          <div className="flex justify-between items-center py-5">
            <div>
              <Link href="/" className="flex items-center">
                <div>
                  <img
                    className="lg:w-[50px] w-[35px] sm:top-[15px] mr-2"
                    src="/logo-brain.png"
                    alt=""
                  />
                </div>
                <p className="light:text-[#001858] lg:text-[35px] text-[20px] font-semibold">
                  Yersultan
                  <span className="text-[#6246EA] text-[20px]">.Blog</span>
                </p>
                {/* <img
                  className="lg:w-[200px] w-[140px] absolute sm:top-[15px] top-[18px] lg:left-[98px]"
                  src="/logo.png"
                  alt=""
                /> */}
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="block text-[25px] mr-5 py-2 pl-3 pr-4 rounded md:p-0"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <FaSun /> : <FaRegMoon />}
              </button>
              <button
                onClick={toggleMenu}
                type="button"
                className={`w-8 h-8 flex justify-around flex-col flex-wrap z-10 cursor-pointer`}
              >
                <div
                  className={` bg-black dark:bg-white block w-8 h-[0.35rem] rounded transition-all origin-[1px]`}
                />
                <div
                  className={` bg-black dark:bg-white block w-8 h-[0.35rem] rounded transition-all origin-[1px]`}
                />
                <div
                  className={` bg-black dark:bg-white block w-8 h-[0.35rem] rounded transition-all origin-[1px]`}
                />
              </button>
            </div>
            <div className="hidden md:block">
              <div className="flex">
                <Link
                  href="/"
                  className="lg:text-[18px] text-[14px] lg:mr-10 mr-4 font-extrabold"
                >
                  <span>Главная</span>
                </Link>
                {categories
                  .map((category, index) => (
                    <Link
                      key={index}
                      href={`/category/${category.slug}`}
                      className={`lg:text-[18px] text-[14px] font-extrabold ${
                        index < categories.length - 1 && "lg:mr-10 mr-4"
                      }`}
                    >
                      <span>{category.name}</span>
                    </Link>
                  ))
                  .filter(
                    (_, index) =>
                      index < categories.length - 1 ||
                      typeof window === "undefined"
                  )}
                <button
                  className="block text-[25px] py-2 pl-3 pr-4 rounded md:p-0"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <FaSun /> : <FaRegMoon />}
                </button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="flex flex-col text-center pb-5 space-y-2">
                <Link href="/" className="text-[18px] py-3 font-extrabold">
                  <span>Главная</span>
                </Link>
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/category/${category.slug}`}
                    className="text-[18px] py-3 font-extrabold"
                  >
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
