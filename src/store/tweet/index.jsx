import { useMutation } from "@tanstack/react-query";
import { toggleLikeTweet, createTweet, deleteTweet } from "../../api/tweet";

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

const useDeleteTweet = () => {
  return useMutation({
    mutationFn: (tweetId) => deleteTweet(tweetId),
  });
};

export { useToggleLike, useCreateTweet, useDeleteTweet };
