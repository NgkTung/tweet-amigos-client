import { useParams } from "react-router-dom";
import { getTweetById } from "../api";
import { useQuery } from "@tanstack/react-query";
import TweetButtons from "../components/tweet/TweetButtons";

const TweetDetail = () => {
  const { id } = useParams();

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
    const data = await getTweetById(id);
    return data;
  };

  const {
    data: tweet,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tweet"],
    queryFn: fetchTweet,
    options: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  console.log(tweet);

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
        <TweetButtons />
      </div>
    </div>
  );
};

export default TweetDetail;
