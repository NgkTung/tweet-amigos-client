// Icons
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { RiShare2Fill } from "react-icons/ri";

const TweetButtons = () => {
  return (
    <div className="flex w-full justify-start items-center mt-5 space-x-24 px-8 pb-4">
      <button className="flex items-center">
        <BiMessageRounded size={20} /> <span className="ms-1">3</span>
      </button>
      <button className="flex items-center">
        <FaRetweet size={20} /> <span className="ms-1">1.6k</span>
      </button>
      <button className="flex items-center">
        <FaRegHeart size={20} /> <span className="ms-1">3.5k</span>
      </button>
      <button>
        <RiShare2Fill size={20} />
      </button>
    </div>
  );
};

export default TweetButtons;
