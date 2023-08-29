"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/services";

interface Category {
  name: string;
  slug: string;
}

const Header: React.FC = (): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className="bg-[#f9f8f4] shadow-[0px_19px_15px_0px_#00000024]">
        <div className="container mx-auto lg:px-10 px-10 mb-8">
          <div className="flex justify-between items-center py-5">
            <div>
              <Link href="/">
                <p className="text-[#001858] lg:text-[35px] text-[20px] font-semibold">
                  Yersultan
                  <span className="text-[#6246EA] text-[20px]">.Blog</span>
                </p>
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-[18px] font-extrabold"
              >
                Меню
              </button>
            </div>
            <div className="hidden md:block">
              <Link
                href="/"
                className="lg:text-[18px] text-[14px] lg:mr-10 mr-4 font-extrabold"
              >
                <span>Главная</span>
              </Link>
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.slug}`}
                  className="lg:text-[18px] text-[14px] lg:mr-10 mr-4 font-extrabold "
                >
                  <span>{category.name}</span>
                </Link>
              ))}
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
