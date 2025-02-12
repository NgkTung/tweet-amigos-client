import { useQuery } from "@tanstack/react-query";
import { getTweets } from "../../api/tweet";
import TweetListItem from "./TweetListItem";
import { useStore } from "../../store";
import Loading from "../Loading";

const TweetList = () => {
  const { user } = useStore();

  const fetchTweets = async () => {
    const data = await getTweets(user?.id, 1, 10);
    return data;
  };

  const {
    data: tweetsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tweets", user.id],
    queryFn: fetchTweets,
    options: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const filteredTweets = tweetsResponse?.data.filter(
    (tweet) => tweet.retweet_id === null
  );

  return (
    <div>
      {filteredTweets.length === 0 ? (
        <p>No tweets available</p>
      ) : (
        filteredTweets.map((tweet) => (
          <div key={tweet.id}>
            <TweetListItem tweet={tweet} />
          </div>
        ))
      )}
    </div>
  );
};

export default TweetList;
