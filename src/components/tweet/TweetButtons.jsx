// Icons
import PropTypes from "prop-types";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { RiShare2Fill } from "react-icons/ri";
import LikeButton from "../LikeButton";
import { useState } from "react";

const TweetButtons = ({ tweetId, isLiked, retweetCount, likesCount }) => {
  const [statusCount, setStatusCount] = useState({
    retweetCount: retweetCount,
    likesCount: likesCount,
  });
  return (
    <div className="flex w-full justify-start items-center mt-5 space-x-24 px-8 pb-4">
      <button className="flex items-center">
        <BiMessageRounded size={20} />{" "}
        <span className="ms-1">{statusCount.retweetCount}</span>
      </button>
      <button className="flex items-center">
        <FaRetweet size={20} /> <span className="ms-1">1.6k</span>
      </button>
      <button className="flex items-center">
        <LikeButton
          tweetId={tweetId}
          isLiked={isLiked}
          likesCount={statusCount.likesCount}
          setStatusCount={setStatusCount}
        />{" "}
        {/* <span className="ms-1">{statusCount.likesCount}</span> */}
      </button>
      <button>
        <RiShare2Fill size={20} />
      </button>
    </div>
  );
};

TweetButtons.propTypes = {
  tweetId: PropTypes.string,
  isLiked: PropTypes.bool,
  retweetCount: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
};

export default TweetButtons;
