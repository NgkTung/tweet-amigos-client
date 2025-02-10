import { useState } from "react";
import { FaSmile } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import EmojiPicker from "emoji-picker-react";
import { createTweet } from "../api/tweet";
import { useStore } from "../store";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const TextEditor = ({ retweetId, email }) => {
  const { showTextEditor, setShowTextEditor, user } = useStore();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleTextChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("user_id", user.id);
    if (retweetId) {
      formData.append("retweet_id", retweetId);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const data = await createTweet(formData);
      if (data) {
        setContent("");
        setImage(null);
        if (showTextEditor === true) {
          setShowTextEditor(false);
        }
        toast.success("Tweet created");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex">
        <div className="w-1/6">
          {user !== undefined && (
            <img
              src={user.profile_image_url}
              alt="profile image avatar"
              className="profile-image-small"
            />
          )}
        </div>
        <div className="flex flex-col space-y-4">
          {retweetId && email && (
            <p className="text-gray-400">
              Replying to{" "}
              <span className="text-blue-500 font-bold">{email}</span>
            </p>
          )}

          <textarea
            value={content}
            onChange={handleTextChange}
            placeholder="What's happening?"
            className="text-[18px] w-full focus:outline-none whitespace-pre-wrap"
            rows={4}
          ></textarea>
        </div>
      </div>
      {imagePreview && (
        <div className="relative">
          <button
            className="absolute top-5 right-5 p-1 rounded-full text-primary hover:bg-opacity-35 hover:bg-black"
            onClick={() => setImagePreview(null)}
          >
            <TiDelete size={40} />
          </button>
          <img src={imagePreview} alt="preview" className="py-3 mx-auto" />
        </div>
      )}
      <div className="flex justify-between border-t border-primary py-3 mt-3">
        <div className="flex gap-x-1">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-primary rounded-full cursor-pointer transition"
          >
            <FaSmile />
          </button>
          <label
            htmlFor="image-upload"
            className="p-2 hover:bg-primary rounded-full cursor-pointer transition"
          >
            <FaRegImage />
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <button
          onClick={handleSubmit}
          disabled={content.trim() === "" || content === null}
          className="bg-primary text-white rounded-full py-1 px-5 disabled:bg-gray-300 tracking-wider font-semibold"
        >
          Post
        </button>
      </div>
      {showEmojiPicker && (
        <div className="absolute z-10 bg-white border shadow-md rounded mt-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

TextEditor.propTypes = {
  retweetId: PropTypes.string,
  email: PropTypes.string,
};

export default TextEditor;
