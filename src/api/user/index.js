import axios from "axios";
import config from "../../config";

const { API_URL } = config;

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
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

export const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};
