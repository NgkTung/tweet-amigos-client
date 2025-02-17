import { useMutation } from "@tanstack/react-query";
import { toggleFollow, updateUser } from "../../api/user";

const useToggleFollow = () => {
  return useMutation({
    mutationFn: (data) => toggleFollow(data.userId, data.followerId),
  });
};

const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data) => updateUser(data.userId, data.formData),
  });
};

export { useToggleFollow, useUpdateUser };
