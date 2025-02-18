import config from "../../config";
import axios from "axios";

const { API_URL } = config;

export async function getTweets(params) {
  const response = await axios.get(`${API_URL}/tweets`, {
    params,
  });
  return response.data;
}

export async function getTweetById(tweetId, userId) {
  const response = await axios.get(`${API_URL}/tweets/${tweetId}`, {
    params: { user_id: userId },
  });
  return response.data;
}

export async function getTweetsByUserId(userId, page, pageSize) {
  const response = await axios.get(`${API_URL}/user/${userId}/tweets`, {
    params: {
      page,
      page_size: pageSize,
    },
  });
  return response.data;
}

export async function createTweet(formData) {
  const response = await axios.post(`${API_URL}/tweets`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function getRetweets(tweetId, userId, page, pageSize) {
  const response = await axios.get(`${API_URL}/tweets/${tweetId}/retweets`, {
    params: {
      user_id: userId,
      page,
      page_size: pageSize,
    },
  });
  return response.data;
}

export async function toggleLikeTweet(tweetId, userId) {
  const response = await axios.post(
    `${API_URL}/tweets/${tweetId}/toggle-like`,
    { user_id: userId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function checkLikingStatus(tweetId, userId) {
  const response = await axios.post(
    `${API_URL}/tweets/${tweetId}/like`,
    { user_id: userId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}
