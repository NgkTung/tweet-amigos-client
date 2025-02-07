import { useParams } from "react-router-dom";
import { getTweetById } from "../api/tweet";
import { useQuery } from "@tanstack/react-query";
import TweetButtons from "../components/tweet/TweetButtons";
import { useStore } from "../store";
import RetweetList from "../components/tweet/RetweetList";
import Loading from "../components/Loading";
import ReplyingTo from "../components/tweet/ReplyingTo";
import TextEditor from "../components/TextEditor";
import { useState } from "react";

const TweetDetail = () => {
  const { id } = useParams();
  const { user } = useStore();

  const [openReply, setOpenReply] = useState(false);

  const renderTextWithLineBreaks = (text) => {
    // Replace \r\n or \n with <br />
    return text.split(/\r?\n/).map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };

  const fetchTweet = async () => {
    const data = await getTweetById(id, user?.id);
    return data;
  };

  const {
    data: tweet,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tweet", id, user.id],
    queryFn: fetchTweet,
    enabled: !!id,
    options: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <div className="py-6 px-4">
        <div className="flex mb-4">
          <div className="w-1/6">
            <img
              src={tweet.user.profile_image_url}
              alt="profile image avatar"
              className="profile-image-small"
            />
          </div>
          <div className="w-full">
            <p className="font-bold text-[18px]">{tweet.user.username}</p>
            <p className="text-gray-500">{tweet.user.email}</p>
          </div>
        </div>
        {tweet.retweet_id && (
          <ReplyingTo retweetId={tweet.retweet_id} email={tweet.reply_to} />
        )}
        <div>{renderTextWithLineBreaks(tweet.content)}</div>
        {tweet.image_url && (
          <img
            src={tweet.image_url}
            alt="tweet image"
            className="border mt-5"
          />
        )}
      </div>
      <div className="border-t border-b mx-4">
        <TweetButtons
          tweetId={tweet.id}
          isLiked={tweet.is_liked}
          retweetCount={tweet.retweet_count}
          likesCount={tweet.likes_count}
        />
      </div>
      {openReply === true ? (
        <TextEditor retweetId={tweet.id} email={tweet.user.email} />
      ) : (
        <div className="flex justify-between mx-4 py-4 border-b">
          <div>
            <img
              src={user.profile_image_url}
              alt={`avatar-${user.username}`}
              className="profile-image-small"
            />
          </div>
          <button
            className="bg-primary text-white text-[14x] font-bold rounded-full py-1 px-5 hover:brightness-125 transition-all"
            onClick={() => setOpenReply(true)}
          >
            Reply
          </button>
        </div>
      )}
      <RetweetList tweetId={tweet.id} />
    </div>
  );
};

export default TweetDetail;
