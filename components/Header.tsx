"use client";

import { getCategories } from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="bg-[#f9f8f4] shadow-[0px_19px_15px_0px_#00000024]">
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
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.slug}`}
                className="text-[18px] mr-10 font-extrabold"
              >
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
