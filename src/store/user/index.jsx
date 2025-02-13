import { useMutation } from "@tanstack/react-query";
import { toggleFollow } from "../../api/user";

const useToggleFollow = () => {
  return useMutation({
    mutationFn: (data) => toggleFollow(data.userId, data.followerId),
  });
};

export { useToggleFollow };
