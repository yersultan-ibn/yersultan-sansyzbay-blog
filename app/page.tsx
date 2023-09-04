"use client";
import {
  Categories,
  Footer,
  Pagination,
  PostCard,
  PostWidget,
  Row,
  Spinner,
  TypeWriter,
} from "@/components";
import CustomButton from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import rightIcon from "../public/right-arrow.svg";
import { FeaturedPosts } from "@/sections";
import { hats } from "@/constants";
import useGraphQLRequest, { Post } from "@/services/useGraphQLRequest";
interface PostData {
  id: string;
  node: any;
}

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const itemsPerPage: number = 3;
  const totalItems: number = 20;
  const pageCount: number = Math.ceil(totalItems / itemsPerPage);

  const { getPosts } = useGraphQLRequest();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const startIndex: number = (currentPage - 1) * itemsPerPage;
      const endIndex: number = startIndex + itemsPerPage;

      const postsData = await getPosts(startIndex, endIndex);
      const sortedPosts = postsData.sort((a: any, b: any) => {
        const dateA = new Date(a.node.createdAt);
        const dateB = new Date(b.node.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      setPosts(sortedPosts);

      setIsLoading(false);
      window.scrollTo(0, 0);
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <>
      <TypeWriter hats={hats} />
      <div className="container mx-auto sm:px-10 px-5 mb-8">
        <Row text="Избранные публикации" styles="mb-5" />
        <FeaturedPosts />
        <Row text="Последние публикации" styles="mb-5" />
        <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-12 mb-10">
          <div className="lg:col-span-8 col-span-1">
            {isLoading ? (
              <Spinner />
            ) : (
              posts?.map((post, index) => (
                <PostCard key={post.id} post={post.node} />
              ))
            )}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8 md:mb-0 mb-10">
              {/* <PostWidget /> */}
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
      <Footer />
    </>
  );
}
