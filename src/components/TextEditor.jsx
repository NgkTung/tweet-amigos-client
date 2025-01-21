import { useState } from "react";
import { FaSmile } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import EmojiPicker from "emoji-picker-react";
import PropTypes from "prop-types";
import { useStore } from "../store";

const TextEditor = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { setShowTextEditor } = useStore();

  const handleEmojiClick = (emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("user_id", 1);
    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);
  };

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center"
      onClick={setShowTextEditor}
    >
      <div
        className="bg-white rounded-lg p-5 w-[500px] mt-14 relative self-start max-h-[90%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="text-[18px] w-full focus:outline-none"
          rows={4}
        />
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
        <div className="flex justify-between border-t border-primary py-3">
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
            className="bg-primary text-white rounded-full py-1 px-5"
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
    </div>
  );
};

TextEditor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TextEditor;
