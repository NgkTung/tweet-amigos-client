import { useQuery } from "@tanstack/react-query";
import { getTweets } from "../../api";
import TweetListItem from "./TweetListItem";

const TweetList = () => {
  const fetchTweets = async () => {
    const data = await getTweets();
    return data;
  };
  const {
    data: tweets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tweets"],
    queryFn: fetchTweets,
    options: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  return (
    <div>
      {tweets.length === 0 ? (
        <p>No tweets available</p>
      ) : (
        tweets.map((tweet) => (
          <div key={tweet.id}>
            <TweetListItem tweet={tweet} />
          </div>
        ))
      )}
    </div>
  );
};

export default TweetList;
