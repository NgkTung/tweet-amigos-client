import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store";
import { getRetweets } from "../../api/tweet";
import { BiMessageRounded } from "react-icons/bi";
import PropTypes from "prop-types";
import TweetListItem from "./TweetListItem";
import Loading from "../Loading";

const RetweetList = ({ tweetId }) => {
  const { user } = useStore();

  const fetchRetweets = async () => {
    const data = await getRetweets(tweetId, user.id, 1, 10);
    return data;
  };

  const {
    data: retweetsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["retweets", tweetId, user.id],
    queryFn: fetchRetweets,
    enabled: !!tweetId,
    options: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  });

  if (isLoading) return <Loading />;
  if (error && error.status === 404)
    return (
      <p className="text-center text-[20px] my-10 text-gray-400 font-bold tracking-wider flex items-center justify-center">
        <BiMessageRounded className="me-3" size={30} /> There are no comment yet
      </p>
    );
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="mb-20">
      {!retweetsResponse || retweetsResponse.data.length === 0 ? (
        <p className="text-center text-[20px] my-10 text-gray-400 font-bold tracking-wider flex items-center justify-center">
          <BiMessageRounded className="me-3" size={30} /> There are no comment
          yet
        </p>
      ) : (
        retweetsResponse.data.map((tweet) => (
          <div key={tweet.id}>
            <TweetListItem tweet={tweet} />
          </div>
        ))
      )}
    </div>
  );
};

RetweetList.propTypes = {
  tweetId: PropTypes.string,
};

export default RetweetList;
