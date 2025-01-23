import config from "../config";
import axios from "axios";

const { API_URL } = config;

export async function getTweets() {
  const response = await axios.get(`${API_URL}/tweets`);
  return response.data;
}

export async function getTweetById(tweetId) {
  const response = await axios.get(`${API_URL}/tweets/${tweetId}`);
  return response.data;
}

export async function createTweet(formData) {
  const response = await axios.post(`${API_URL}/tweets`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
