import PropTypes from "prop-types";

// Icons
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { RiShare2Fill } from "react-icons/ri";

const TweetListItem = ({ tweet }) => {
  console.log("tweet: ", tweet);
  const { profile_image_url, username, email } = tweet.user;

  return (
    <div className="flex py-2 border-b border-gray-500">
      <div className="px-4">
        <img
          src={profile_image_url}
          className="rounded-full object-cover w-[60px] h-[50px]"
        />
      </div>
      <div className="w-full">
        <p>
          <span className="font-bold mb-2">{username}</span>{" "}
          <span className="font-semibold text-gray-500">{email}</span>
        </p>
        <p>{tweet.content}</p>
        <div className="flex w-9/12 justify-between items-center mt-5">
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
      </div>
    </div>
  );
};

TweetListItem.propTypes = {
  tweet: PropTypes.shape({
    user: PropTypes.shape({
      profile_image_url: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default TweetListItem;
