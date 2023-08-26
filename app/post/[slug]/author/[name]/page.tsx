"use client";
import { Spinner } from "@/components";
import { getAuthorDetails, getPostDetails } from "@/services";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthorDetails = ({ params }) => {
  const [author, setAuthor] = useState([]);
  const router = useRouter();

  if (router.isFallback) {
    return <Spinner />;
  }

  useEffect(() => {
    const fetchData = async () => {
      setAuthor(await getAuthorDetails(params.slug));
    };

    fetchData();
  }, []);

  console.log("AuthorDetailsAuthorDetails", author);

  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg">
      <div className="flex justify-center">
        <Image
          unoptimized
          //   loader={grpahCMSImageLoader}
          alt={author?.name}
          height="100"
          width="100"
          className="align-middle rounded-full"
          src={author?.photo?.url}
        />
      </div>
      <h3 className="text-black mt-4 mb-4 text-xl font-bold">{author?.name}</h3>
      <p className="text-black text-ls">{author?.bio}</p>
      <span className="align-middle">
        Дата присоединения: {moment(author?.createdAt).format("MMM DD, YYYY")}
      </span>
    </div>
  );
};

export default AuthorDetails;
