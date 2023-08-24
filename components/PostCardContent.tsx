import Image from "next/image";
import React from "react";

const PostCardContent = ({ post }) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${post.featuredImage.url})`,
  };

  return (
    <div
      className="rounded-[13px] px-8 pb-0 py-8 bg-post-pattern bg-cover h-[500px] bg-center w-full text-white"
      style={backgroundImageStyle}
    >
      <div className="flex flex-col justify-end h-full relative">
        <div className="absolute top-0 bg-white py-1 px-3 rounded-[40px]">
          <span className="text-[#5EB182] uppercase font-semibold text-[13px]">
            Featured
          </span>
        </div>
        <h3 className="font-semibold text-[30px] pb-5">{post.title}</h3>
        <p className="font-light  text-[20px] pb-10 relative z-10">
          {post.excerpt.slice(0, 20)} ...
        </p>
        <div className="block lg:flex items-center mb-8 w-full">
          <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <img
              alt={post.author?.name}
              height="50"
              width="50"
              className="align-middle rounded-full"
              src={post?.author?.photo?.url}
            />
            <p className="ml-2 font-light text-[15px]">{post.author?.name}</p>
          </div>
          <div className="font-light">
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
            <span className="align-middle text-[13px]">
              {/* {moment(post.createdAt).format("MMM DD, YYYY")} */}Oct 08,
              2021
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardContent;
