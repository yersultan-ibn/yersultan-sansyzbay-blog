import React from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import rightIcon from "../public/right-arrow-white.svg";

const FeaturedPostCard = ({ post }) => {
  console.log("FeaturedPostCard", post);
  return (
    <div className="relative h-72">
      <div
        className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"
        style={{ backgroundImage: `url('${post?.featuredImage?.url}')` }}
      />
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
      <div className="flex items-center absolute top-5 w-full justify-center">
        <Image
          unoptimized
          alt={post?.author?.name}
          height="30"
          width="30"
          className="align-middle drop-shadow-lg rounded-full"
          src={post?.author?.photo?.url}
        />
        <p className="inline align-middle text-white text-shadow ml-2 font-light">
          {post?.author?.name}
        </p>
      </div>
      <div className="flex flex-col rounded-lg p-4 absolute bottom-[-160px] text-left w-full h-full">
        <p className="text-white mb-4 text-shadow font-light text-[15px] leading-[20px]">
          {post?.title}
        </p>
        <div className="flex justify-between items-baseline">
          <p className="block text-white  mb-4 text-shadow text-xs font-light">
            {moment(post?.createdAt).format("MMM DD, YYYY")}
          </p>
          <Image
            src={rightIcon}
            alt="allow_right"
            width="15"
            height="15"
            className="object-contain"
          />
        </div>
      </div>
      <Link href={`/post/${post?.slug}`}>
        <span className="cursor-pointer absolute w-full h-full" />
      </Link>
    </div>
  );
};

export default FeaturedPostCard;
