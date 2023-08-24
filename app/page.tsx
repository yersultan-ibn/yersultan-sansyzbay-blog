"use client";
import { Categories, Pagination, PostCard, PostWidget } from "@/components";
import { getPosts } from "@/services";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalItems = 100;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const postsData = await getPosts(startIndex, endIndex);
      setPosts(postsData);
      window.scrollTo(0, 0);
    };

    fetchData();
  }, [currentPage]);

  console.log("posts", posts);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10">
        <div className="lg:col-span-8 col-span-1">
          <PostCard posts={posts} />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
