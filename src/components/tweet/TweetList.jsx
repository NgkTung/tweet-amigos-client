import { useQuery } from "@tanstack/react-query";
import { getTweets } from "../../api/tweet";
import TweetListItem from "./TweetListItem";
import { useStore } from "../../store";
import Loading from "../Loading";

const TweetList = () => {
  const { user } = useStore();

  // Fetch Tweets
  const fetchTweets = async () => {
    const data = await getTweets(user?.id, 1, 10);
    return data;
  };

  // useQuery hook
  const {
    data: tweetsResponse,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["tweets", user.id], // Make sure to use the correct query key
    queryFn: fetchTweets,
    staleTime: 5 * 60 * 1000, // Set a 5-minute stale time
    refetchOnReconnect: true, // Refetch on reconnect (for network issues)
  });

  // Loading and error handling
  if (isFetching) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  // Filter tweets without retweets
  const filteredTweets = tweetsResponse?.data.filter(
    (tweet) => tweet.retweet_id === null
  );

  // Render the tweets
  return (
    <div className="mb-20">
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
