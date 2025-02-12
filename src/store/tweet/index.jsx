import { useMutation } from "@tanstack/react-query";
import { toggleLikeTweet, createTweet } from "../../api/tweet";

const useToggleLike = () => {
  return useMutation({
    mutationFn: (data) => toggleLikeTweet(data.tweetId, data.userId),
  });
};

const useCreateTweet = () => {
  return useMutation({
    mutationFn: (formData) => createTweet(formData),
  });
};

export { useToggleLike, useCreateTweet };
