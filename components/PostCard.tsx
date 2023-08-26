import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import CustomButton from "./Button";

// import { grpahCMSImageLoader } from '../util';

const PostCard = ({ post }) => {
  console.log("post", post);
  return (
    <div className="bg-[#f9f8f4] shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8 border border-[#000]">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6 mx-auto h-full w-[400px]">
        <img
          src={post?.featuredImage?.url}
          alt={post?.name}
          className="object-top absolute h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full border-b border-[#000] pb-3">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 ">
          <Image
            unoptimized
            // loader={grpahCMSImageLoader}
            // alt={post.author.name}
            height="30"
            width="30"
            className="align-middle rounded-full"
            src={post?.author?.photo.url}
          />
          <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
            {post?.author?.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
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
          <span className="align-middle">
            {moment(post?.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-[22px] font-semibold ">
        <Link href={`/post/${post?.slug}`}>{post?.title}</Link>
      </h1>

      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
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
