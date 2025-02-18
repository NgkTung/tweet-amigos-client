import { useQuery } from "@tanstack/react-query";
import { getTweets } from "../api/tweet";
import TextEditor from "../components/TextEditor";
import TweetList from "../components/tweet/TweetList";
import { useStore } from "../store";

const Home = () => {
  const { user } = useStore();

  // Fetch Tweets
  const fetchTweets = async () => {
    const data = await getTweets({
      user_id: user.id,
      page: 1,
      page_size: 10,
      no_retweets: true,
    });
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
    enabled: !!user.id,
    staleTime: 5 * 60 * 1000, // Set a 5-minute stale time
    refetchOnReconnect: true, // Refetch on reconnect (for network issues)
  });

  // Loading and error handling
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  // Filter tweets without retweets
  const tweetList = tweetsResponse?.data ? tweetsResponse?.data : [];
  return (
    <div>
      <div className="p-4 mb-4 border-b border-grey-500">
        <p className="font-bold text-[20px] dark:text-white">Home</p>
      </div>
      <div className="border-b">
        <TextEditor />
      </div>
      <TweetList tweets={tweetList} isFetching={isFetching} />
    </div>
  );
};

export default Home;
