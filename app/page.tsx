"use client";
import {
  Categories,
  Pagination,
  PostCard,
  PostWidget,
  Spinner,
} from "@/components";
import CustomButton from "@/components/Button";
import { getPosts } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import rightIcon from "../public/right-arrow.svg";
import { FeaturedPosts } from "@/sections";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const itemsPerPage = 3;
  const totalItems = 100;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const postsData = await getPosts(startIndex, endIndex);
      setPosts(postsData);
      setIsLoading(false);
      window.scrollTo(0, 0);
    };

    fetchData();
  }, [currentPage]);

  console.log("posts", posts);

  return (
    <div className="container mx-auto px-10 mb-8">
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10">
        <div className="lg:col-span-8 col-span-1">
          {isLoading ? (
            <Spinner />
          ) : (
            posts.map((post, index) => (
              <PostCard key={post.id} post={post.node} />
            ))
          )}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
      {isActive ? null : (
        <CustomButton
          onClick={() => setIsActive(!isActive)}
          rightIcon={rightIcon}
          textStyles="text-[#1565D8]"
          title="Посмотреть все публикации"
          containerStyles="w-[300px] cursor-pointer flex items-end mt-10 mx-auto py-2 border border-solid border-2 border-[#1565D8] rounded-[10px] "
        />
      )}
      {isActive ? (
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </div>
  );
}
