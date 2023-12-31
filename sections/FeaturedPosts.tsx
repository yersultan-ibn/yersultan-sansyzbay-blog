import { Spinner } from "@/components";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import useGraphQLRequest from "@/services/useGraphQLRequest";
import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
interface FeaturedPost {
  id: string;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<FeaturedPost[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const { getFeaturedPosts } = useGraphQLRequest();

  useEffect(() => {
    getFeaturedPosts().then((result: FeaturedPost[]) => {
      const sortedPostsData = result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setFeaturedPosts(sortedPostsData);
      setDataLoaded(true);
    });
  }, []);

  const customLeftArrow = (
    <div className="arrow-btn left-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </div>
  );

  const customRightArrow = (
    <div className="arrow-btn right-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  );
  return (
    <div className="mb-8">
      <Carousel
        infinite
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded ? (
          featuredPosts?.map((post, index) => (
            <FeaturedPostCard key={index} post={post} />
          ))
        ) : (
          <Spinner />
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
