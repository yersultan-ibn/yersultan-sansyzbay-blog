"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// import {
//   PostDetail,
//   Categories,
//   PostWidget,
//   Author,
//   Comments,
//   CommentsForm,
//   Loader,
//   Spinner,
// } from "../../../components";
import { getPostDetails } from "@/services";

// import { AdjacentPosts } from "../../sections";
import { Categories, PostWidget, Spinner } from "@/components";
import PostDetail from "@/components/PostDetail";
import Author from "@/components/Author";

const PostDetails = ({ params }) => {
  const [post, setPost] = useState([]);
  const router = useRouter();

  if (router.isFallback) {
    return <Spinner />;
  }

  useEffect(() => {
    const fetchData = async () => {
      setPost(await getPostDetails(params.slug));
    };

    fetchData();
  }, []);
  //   console.log("postpost", post);
  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="flex justify-center">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post?.author} />
            {/* <AdjacentPosts slug={post.slug} createdAt={post.createdAt} /> */}
            {/* <CommentsForm slug={params?.slug} /> */}
            {/* <Comments slug={params?.slug} /> */}
          </div>
          {/* <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                slug={post?.slug}
                categories={post?.categories?.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default PostDetails;
