import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import TweetButtons from "./TweetButtons";

const TweetListItem = ({ tweet }) => {
  const { profile_image_url, username, email } = tweet.user;

  const navigate = useNavigate();

  const openTweetDetail = () => {
    navigate(`/tweets/${tweet.id}`);
  };

  const renderTextWithLineBreaks = (text) => {
    // Replace \r\n or \n with <br />
    return text.split(/\r?\n/).map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };

  return (
    <div className="border-b">
      <div
        className="flex py-4 px-4  hover:bg-slate-50 cursor-pointer"
        onClick={openTweetDetail}
      >
        <div className="w-1/6">
          <img
            src={profile_image_url}
            alt="profile image avatar"
            className="profile-image-small"
          />
        </div>
        <div className="w-full">
          <p className="mb-2">
            <span className="font-bold">{username}</span>{" "}
            <span className="font-semibold text-gray-500">{email}</span>
          </p>
          <p>{renderTextWithLineBreaks(tweet.content)}</p>
          {tweet.image_url && (
            <div className="w-full mt-5">
              <img src={tweet.image_url} alt="tweet image" />
            </div>
          )}
        </div>
      </div>
      <TweetButtons />
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
    image_url: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default TweetListItem;
