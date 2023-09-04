"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useGraphQLRequest from "@/services/useGraphQLRequest";

interface Category {
  name: string;
  slug: string;
}

const Categories: React.FC = (): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { getCategories } = useGraphQLRequest(); // Use the hook to get the categories

  useEffect(() => {
    getCategories().then((newCategories: Category[]) => {
      setCategories(newCategories);
    });
  }, []);
 
  return (
    <>
      <h3 className="sm:text-[30px] text-[20px] mb-8 font-semibold border-b pt-4 pb-4 text-center border-t uppercase">
        КНИГИ
      </h3>
      {categories?.map((category: Category, index: number) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span
            className={`relative uppercase custom-clip-path dark:text-black bg-[#f1cf71] cursor-pointer block ${
              index === categories.length - 1 ? "border-b-0" : "border-b"
            } text-center  pt-[6px] pb-[6px] mb-3`}
          >
            {category.name}
            <div className="bg-black rounded-full w-[10px] h-[10px] absolute bottom-[0px] left-[21px] top-0 m-auto"></div>
          </span>
        </Link>
      ))}
    </>
  );
};

export default Categories;
