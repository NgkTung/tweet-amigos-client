import axios from "axios";
import config from "../../config";

const { API_URL } = config;

export const getUsers = async (userId) => {
  const response = await axios.get(`${API_URL}/users`, {
    params: {
      user_id: userId,
    },
  });
  return response.data;
};

export const getUser = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.post(
    `${API_URL}/user`,
    { access_token: accessToken },
    { Headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const getUserById = async (userId, followerId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`, {
    params: {
      follower_id: followerId,
    },
  });
  return response.data;
};

export const toggleFollow = async (userId, followerId) => {
  const response = await axios.post(`${API_URL}/user/${userId}`, {
    follower_id: followerId,
  });
  return response.data;
};
