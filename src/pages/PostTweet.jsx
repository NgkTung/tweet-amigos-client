import TextEditor from "../components/TextEditor";
import axios from "axios";
import { useStore } from "../store";

const API_URL = import.meta.env.API_URL;

const PostTweet = () => {
  const { showTextEditor, setShowTextEditor } = useStore();
  const handlePostTweet = async (formData) => {
    try {
      console.log(API_URL);
      const response = await axios.post(
        `http://127.0.0.1:8000/tweets`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response) {
        setShowTextEditor();
      }
    } catch (error) {
      console.error(
        "Error creating tweet: ",
        error.response?.data || error.message
      );
    }
  };

  return <>{showTextEditor && <TextEditor onSubmit={handlePostTweet} />}</>;
};

export default PostTweet;
