import { useQuery } from "@tanstack/react-query";
import { getTweets } from "../../api/tweet";
import TweetListItem from "./TweetListItem";
import { useStore } from "../../store";
import { Skeleton } from "@mui/material";

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
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  // Filter tweets without retweets
  const filteredTweets = tweetsResponse?.data
    ? tweetsResponse?.data.filter((tweet) => tweet.retweet_id === null)
    : [];

  // Render the tweets
  return (
    <div className="mb-20">
      {isFetching ? (
        <div>
          {[...Array(6)].map((_, index) => (
            <div className="border-b" key={index}>
              <div className="flex py-4 px-4 space-x-5">
                <div className="w-1/6">
                  <Skeleton
                    variant="circular"
                    width={55}
                    height={55}
                    animation="wave"
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2">
                    <Skeleton
                      animation="wave"
                      width={index % 2 === 1 ? 250 : 200}
                      height={30}
                    />
                    <Skeleton animation="wave" width={150} height={20} />
                  </div>
                  <p>
                    {[...Array(index % 2 === 1 ? 3 : 2)].map((_, index) => (
                      <Skeleton
                        animation="wave"
                        height={20}
                        className="w-full"
                        key={index}
                      />
                    ))}
                  </p>
                  {index % 4 === 0 && (
                    <div className="w-full h-[300px] mt-5">
                      <Skeleton
                        variant="rectangular"
                        className="w-full"
                        animation="wave"
                        height={300}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
