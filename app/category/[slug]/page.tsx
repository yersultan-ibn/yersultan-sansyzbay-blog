"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostCard, Categories, Spinner } from "@/components";
import { getCategories, getCategoryPost } from "@/services";

const CategoryPost = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (params.slug) {
        const fetchedPosts = await getCategoryPost(params.slug);
        setPosts(fetchedPosts);
      }
    };

    fetchData();
  }, [params.slug]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  if (router.isFallback) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;
