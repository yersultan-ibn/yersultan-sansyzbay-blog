import { PostCardContent } from "../components";
import Image from "next/image";
import moment from "moment";

const PostCard = () => {
  return (
    <div>
      <div className="flex justify-center flex-col">
        <div className="grid grid-cols-2 gap-8">
          <PostCardContent />
          <PostCardContent />
        </div>
        <div className="grid grid-cols-3 gap-8 mt-10">
          <PostCardContent />
          <PostCardContent />
          <PostCardContent />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
