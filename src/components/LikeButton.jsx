import PropTypes from "prop-types";
import { useState } from "react";
import { useStore } from "../store";
import { useToggleLike } from "../store/tweet";

const LikeButton = ({ tweetId, isLiked, likesCount, setStatusCount }) => {
  const [liked, setLiked] = useState(isLiked);
  const { mutate: toggleLike } = useToggleLike();
  const { user } = useStore();

  const handleClick = () => {
    setLiked(!liked);
    setStatusCount((prev) => ({
      ...prev,
      likesCount: liked ? likesCount - 1 : likesCount + 1,
    }));
    toggleLike({ tweetId, userId: user.id });
  };

  return (
    <div className="like-button" onClick={handleClick}>
      <svg
        className={`heart-icon ${liked ? "liked" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px"
      >
        <path
          fill={liked ? "#ff0000" : "none"}
          stroke={liked ? "#ff0000" : "#000000"}
          strokeWidth="2"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
      <span className="like-text">{likesCount}</span>
    </div>
  );
};

LikeButton.propTypes = {
  tweetId: PropTypes.string,
  isLiked: PropTypes.bool,
  likesCount: PropTypes.number,
  setStatusCount: PropTypes.func,
};

export default LikeButton;
