import React from "react";
import moment from "moment";
import Link from "next/link";

interface Author {
  name: string;
  photo: {
    url: string;
  };
}

interface Post {
  featuredImage: {
    url: string;
  };
  title: string;
  slug: string;
  author?: Author;
  createdAt: string;
  content: {
    raw: {
      children: {
        type: string;
        children: {
          text: string;
          bold?: boolean;
          italic?: boolean;
          underline?: boolean;
        }[];
        title?: string;
        src?: string;
        width?: string;
        height?: string;
      }[];
    };
  };
}

interface PostDetailProps {
  post: Post;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }): JSX.Element => {
  const getContentFragment = (
    index: number,
    text: string,
    obj?: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      title?: string;
      src?: string;
      width?: string;
      height?: string;
    },
    type?: string
  ): JSX.Element | JSX.Element[] | string => {
    let modifiedText: JSX.Element | string = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (
          <b className="bg-[#f3eabc] leading-[1.8] font-semibold" key={index}>
            {text}
          </b>
        );
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }
      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="md:text-xl">
            {modifiedText}
          </h3>
        );
      case "paragraph":
        return (
          <p
            key={index}
            className="mb-8 leading-loose md:text-[20px] text-[18px]"
          >
            {modifiedText}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-8">
            {modifiedText}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj?.title}
            height={obj?.height}
            width={obj?.width}
            src={obj?.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg lg:p-8 pb-12 md:mb-8 md:w-[70%] w-full mx-auto">
        <div className="relative overflow-hidden shadow-md mb-6 md:w-[60%] w-[95%] mx-auto">
          <img
            src={post?.featuredImage?.url}
            alt=""
            className="object-top h-full w-full object-cover  shadow-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <h1 className="mb-8 md:text-3xl text-[24px] font-semibold text-center">
            {post?.title}
          </h1>
          <Link href={`/post/${post?.slug}/author/${post?.author?.name}`}>
            <div className="flex justify-center items-center mb-8 w-full">
              <div className="md:flex items-center justify-center lg:mb-0 w-auto mr-3">
                <img
                  alt={post?.author?.name}
                  height="70"
                  width="70"
                  className="align-middle rounded-full"
                  src={post?.author?.photo?.url}
                />
              </div>
              <div className="font-medium text-gray-700 flex flex-col">
                <p className="inline align-left text-gray-700 font-medium text-lg">
                  {post?.author?.name}
                </p>
                <span className="align-middle text-[#397ade] font-light text-[15px]">
                  {moment(post?.createdAt).format("MMM DD, YYYY")}
                </span>
              </div>
            </div>
          </Link>

          {post?.content?.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) =>
              getContentFragment(itemindex, item.text, item)
            );

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
