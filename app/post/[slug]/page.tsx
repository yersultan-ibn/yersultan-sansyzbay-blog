"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Categories, PostWidget, Spinner } from "@/components";
import PostDetail from "@/components/PostDetail";
import Author from "@/components/Author";
import Link from "next/link";
import { AdjacentPosts } from "@/sections";
import CommentsForm from "@/components/CommentsForm";
import Comments from "@/components/Comments";
import useGraphQLRequest from "@/services/useGraphQLRequest";

interface PostDetailsProps {
  params: {
    slug: string;
  };
}

const PostDetails: React.FC<PostDetailsProps> = ({ params }) => {
  const [post, setPost] = useState<any>({});
  const router = useRouter();

  const { getPostDetails } = useGraphQLRequest();

  if (router.isFallback) {
    return <Spinner />;
  }

  useEffect(() => {
    const fetchData = async () => {
      setPost(await getPostDetails(params.slug));
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto md:px-10 mb-8">
        <div className="flex justify-center">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            {/* <Author author={post?.author} /> */}
            {/* <AdjacentPosts createdAt={post?.createdAt} slug={params?.slug} /> */}
            <CommentsForm slug={params?.slug} />
            <Comments slug={params?.slug} />
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;
