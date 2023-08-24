"use client";
import { PostCardContent } from ".";
import Image from "next/image";
import moment from "moment";
import { useEffect, useState } from "react";
import { getPosts } from "@/services";
import CustomButton from "./Button";

import rightIcon from "../public/right-arrow.svg";
import Link from "next/link";

const PostCard = ({ posts }) => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setPosts(await getPosts());
  //   };

  //   fetchData();
  // }, []);

  // const sortedPosts = [...posts].sort((a, b) => {
  //   const dateA = new Date(a.node.createdAt);
  //   const dateB = new Date(b.node.createdAt);
  //   return dateB - dateA;
  // });

  // const latestPosts = sortedPosts.slice(0, 2);
  // const moreLatestPosts = sortedPosts.slice(2, 5);
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.node.createdAt);
    const dateB = new Date(b.node.createdAt);
    return dateB - dateA;
  });

  const latestPosts = sortedPosts.slice(0, 2); // Выбираем 2 последних поста
  const moreLatestPosts = sortedPosts.slice(2, 5); // Выбираем следующие 3 поста

  return (
    <div>
      <div className="flex justify-center flex-col">
        <div className="grid grid-cols-2 gap-8">
          {latestPosts?.map((post) => (
            <PostCardContent key={post.id} post={post.node} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-8 mt-10">
          {/* {console.log(
            "Number of items in moreLatestPosts:",
            moreLatestPosts.length
          )} */}
          {moreLatestPosts?.map((post) => (
            <PostCardContent key={post.id} post={post.node} />
          ))}
        </div>
        <Link href="/posts">
          <CustomButton
            rightIcon={rightIcon}
            textStyles="text-[#1565D8]"
            title="More articles"
            containerStyles="w-[150px] cursor-pointer flex items-end mt-10 mx-auto py-2 border border-solid border-2 border-[#1565D8] rounded-[10px] "
          />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
