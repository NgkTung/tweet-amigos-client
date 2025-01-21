import config from "../config";
import axios from "axios";

const { API_URL } = config;

export async function getTweets() {
  try {
    console.log("URL: ", API_URL);
    const response = await axios.get(`${API_URL}/tweets`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTweet(newTweet) {
  try {
    const response = await axios.post(`${API_URL}/tweets`, newTweet);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
