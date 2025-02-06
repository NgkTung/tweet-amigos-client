import config from "../../config";
import axios from "axios";

const { API_URL } = config;

export const signin = async (credentials) => {
  const response = await axios.post(`${API_URL}/signin`, credentials, {
    Headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const signout = async () => {
  const response = await axios.post(`${API_URL}/signout`);
  return response.data;
};

export const signup = async (data) => {
  const response = await axios.post(`${API_URL}/signup`, data, {
    Headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
