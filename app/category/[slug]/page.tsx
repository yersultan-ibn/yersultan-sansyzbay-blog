"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostCard, Categories, Spinner, Row } from "@/components";
import useGraphQLRequest from "@/services/useGraphQLRequest";

interface CategoryPostProps {
  params: {
    slug: string;
  };
}

const CategoryPost: React.FC<CategoryPostProps> = ({ params }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const node = posts.map((item) => item.node);
  const categoriesParent = node.map((item) => item.categories);
  const categoriesArray = categoriesParent.map((item) => item[0]);
  const categoriesInner = categoriesArray.map((item) => item);
  const categoriesName = categoriesInner.map((item) => item.name);
  // console.log(
  //   "categoriesName",
  //   categoriesName.map((item) => console.log("itemfisf12`13`13`13", item.name))
  // );

  const router = useRouter();

  const { getCategoryPost, getCategories } = useGraphQLRequest();

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
    <div className="container mx-auto md:px-10 px-5 mb-8">
      <Row text={categoriesName[0]} styles="mb-5" />
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
