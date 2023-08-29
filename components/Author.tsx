import { grpahCMSImageLoader } from "@/util";
import Image from "next/image";
import React from "react";

interface AuthorData {
  name: string;
  bio: string;
  photo: {
    url: string;
  };
}

interface AuthorProps {
  author: AuthorData;
}

interface GraphCMSImageLoader extends ImageLoaderProps {
  src: string;
}

const Author: React.FC<AuthorProps> = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          unoptimized
          loader={({ src }: GraphCMSImageLoader) => grpahCMSImageLoader(src)}
          alt={author?.name}
          height="100"
          width="100"
          className="align-middle rounded-full"
          src={author?.photo?.url}
        />
      </div>
      <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author?.name}</h3>
      <p className="text-white text-ls">{author?.bio}</p>
    </div>
  );
};

export default Author;
