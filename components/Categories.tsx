"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/services";

const Categories = (): JSX.Element => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="">
      <h3 className="text-[30px] mb-8 font-semibold border-b pt-4 pb-4 text-center border-t uppercase">
        КНИГИ
      </h3>
      {categories?.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span
            className={`relative uppercase custom-clip-path bg-[#f1cf71] cursor-pointer block ${
              index === categories.length - 1 ? "border-b-0" : "border-b"
            } text-center  pt-[6px] pb-[6px] mb-3`}
          >
            {category.name}
            <div className="bg-black rounded-full w-[10px] h-[10px] absolute bottom-[0px] left-[21px] top-0 m-auto"></div>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
