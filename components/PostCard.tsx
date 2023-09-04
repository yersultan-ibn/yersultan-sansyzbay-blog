import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import CustomButton from "./Button";
import { grpahCMSImageLoader } from "@/util";

interface Category {
  name: string;
  slug: string;
}

interface Author {
  name: string;
  photo: {
    url: string;
  };
}

interface Post {
  featuredImage: {
    url: string;
  };
  slug: string;
  name: string;
  author: Author;
  createdAt: string;
  categories: Category[];
  title: string;
  excerpt: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }): JSX.Element => {
  return (
    <div className="bg-[#f9f8f4] shadow-lg rounded-lg p-0 lg:p-8 pt-5 sm:pb-12 pb-5 mb-8 border border-[#000]">
      <div className="relative overflow-hidden sm:shadow-md mb-6 mx-auto sm:w-[400px] w-full">
        <img
          src={post?.featuredImage?.url}
          alt={post?.name}
          className="object-top  w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg md:px-0 px-5"
        />
      </div>
      <div className="relative flex xl:justify-between xl:flex-row flex-col text-center items-center justify-center mb-8 w-full border-b border-[#000] pb-3">
        <Link
          href={`/post/${post?.slug}/author/${post?.author?.name}`}
          className="md:flex mx-auto"
        >
          <div className="flex items-center justify-center md:mb-4 lg:mb-0 w-full lg:w-auto md:mr-8  mr-1">
            <Image
              unoptimized
              loader={grpahCMSImageLoader}
              alt={post?.author?.name}
              height="30"
              width="30"
              className="align-middle rounded-full"
              src={post?.author?.photo.url}
            />
            <p className="inline align-middle text-gray-700 ml-2 font-medium md:text-lg sm:text-[14px] text-[12px]">
              {post?.author?.name}
            </p>
          </div>
          <div className="font-medium text-gray-700 my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-[#1665d8]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="break-normal align-middle md:text-[15px]  text-[14px]">
              {moment(post?.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </Link>

        <div className="xl:my-0 md:my-5 cursor-pointer right-5 sm:text-[16px] text-[13px] bg-[#f1cf71] text-black rounded-[14px] px-5 py-1">
          {post?.categories?.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span
                className={`block ${
                  index === post?.categories?.length - 1
                    ? "border-b-0"
                    : "border-b"
                }`}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <h1 className="transition duration-700 text-center md:mb-8 mb-3 cursor-pointer hover:text-[#1665d8] md:text-[22px] px-3 text-[19px] font-semibold ">
        <Link href={`/post/${post?.slug}`}>{post?.title}</Link>
      </h1>

      <p className="text-center text-lg text-gray-700 font-normal px-4 sm:text-[20px] text-[13px] lg:px-20 mb-8">
        {post?.excerpt.slice(0, 130)}...
      </p>
      <div className="text-center">
        <Link href={`/post/${post?.slug}`}>
          <CustomButton
            textStyles="text-[#1565D8]"
            title="Читать..."
            containerStyles="w-[300px] cursor-pointer flex items-end mt-10 mx-auto py-2 border border-solid border-2 border-[#1565D8] rounded-[10px] "
          />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
