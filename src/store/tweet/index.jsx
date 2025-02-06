import { useMutation } from "@tanstack/react-query";
import { toggleLikeTweet } from "../../api/tweet";

const useToggleLike = () => {
  return useMutation({
    mutationFn: (data) => toggleLikeTweet(data.tweetId, data.userId),
  });
};

export { useToggleLike };
