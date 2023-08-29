"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import useGraphQLRequest from "@/services/useGraphQLRequest";
import { grpahCMSImageLoader } from "@/util";
import { getRecentPosts, getSimilarPost } from "@/services";

interface Post {
  title: string;
  slug: string;
  createdAt: string;
  featuredImage: {
    url: string;
  };
}

interface PostWidgetProps {
  categories: string[];
  slug?: string;
}

const PostWidget: React.FC<PostWidgetProps> = ({
  categories,
  slug,
}): JSX.Element => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  useEffect(() => {
    if (slug) {
      getSimilarPost(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, []);
  return (
    <div className="bg-[#f9f8f4] shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Похожие посты" : "Недавние посты"}
      </h3>
      {relatedPosts?.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              loader={grpahCMSImageLoader}
              alt={post.title}
              height="60"
              width="60"
              unoptimized
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`} className="text-md" key={index}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
