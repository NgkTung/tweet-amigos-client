import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getTweetById } from "../api/tweet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TweetButtons from "../components/tweet/TweetButtons";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { MdReport } from "react-icons/md";
import { useStore } from "../store";
import RetweetList from "../components/tweet/RetweetList";
import Loading from "../components/Loading";
import ReplyingTo from "../components/tweet/ReplyingTo";
import TextEditor from "../components/TextEditor";
import { useEffect, useState } from "react";
import { useDeleteTweet } from "../store/tweet";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";

const TweetDetail = () => {
  const { id } = useParams();
  const { user } = useStore();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showOptions, setShowOptions] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  const {
    mutate: deleteTweet,
    isPending: isTweetDeleting,
    isSuccess: isTweetDeleteSuccess,
    error: tweetDeleteError,
  } = useDeleteTweet();

  const handleShowOptions = (e) => {
    e.preventDefault();
    setShowOptions(!showOptions);
  };

  const handleClickOption = (e) => {
    e.preventDefault();
    console.log(tweet.user_id);
    console.log(user.id);
  };

  const renderTextWithLineBreaks = (text) => {
    // Replace \r\n or \n with <br />
    return text.split(/\r?\n/).map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };

  const fetchTweet = async () => {
    const data = await getTweetById(id, user?.id);
    return data;
  };

  const {
    data: tweet,
    isLoading,
    isPending,
    error,
  } = useQuery({
    queryKey: ["tweet", id, user.id],
    queryFn: fetchTweet,
    enabled: !!id,
    options: {
      staleTime: 5 * 60 * 1000,
    },
  });

  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteTweet = () => {
    deleteTweet(tweet.id);
    if (isTweetDeleteSuccess || error) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (isTweetDeleteSuccess) {
      toast.success("Tweet deleted");
      navigate(`/profile`);
      queryClient.invalidateQueries("get-tweets-by-user-id");
    }
  }, [isTweetDeleteSuccess, navigate, queryClient]);

  useEffect(() => {
    if (tweetDeleteError) {
      toast.error("Failed to delete tweet");
    }
  }, [tweetDeleteError]);

  if (isLoading || isPending) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="absolute bg-white top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
          <p className="font-semibold p-10">
            Are you sure you want to delete this tweet?
          </p>
          <div className="flex">
            <button
              className="w-full border-t py-3 bg-gray-200 font-semibold hover:bg-gray-300 transition-colors"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="w-full border-t py-3 bg-red-200 text-red-500 font-semibold hover:bg-red-300 transition-colors"
              disabled={isTweetDeleting}
              onClick={handleDeleteTweet}
            >
              {isTweetDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
      <div className="py-6 px-4">
        <NavLink to={`/user/${tweet.user_id}`}>
          <div className="flex mb-4">
            <div className="w-1/6">
              <img
                src={tweet.user.profile_image_url}
                alt="profile image avatar"
                className="profile-image-small"
              />
            </div>
            <div className="w-full">
              <p className="font-bold text-[18px] dark:text-white">
                {tweet.user.username}
              </p>
              <p className="text-gray-500 font-semibold">{tweet.user.email}</p>
            </div>
            <div className="relative">
              <button onClick={handleShowOptions}>
                <HiOutlineDotsVertical size={20} />
              </button>
              {showOptions && (
                <div className="absolute z-50 bg-white shadow-lg left-0">
                  <div className="flex flex-col">
                    {tweet.user_id === user.id && (
                      <div className="flex items-center space-x-2 py-2 px-6 hover:bg-[#ddd] transition-all cursor-pointer">
                        <FaEdit /> <p>Edit</p>
                      </div>
                    )}
                    <div
                      className="flex items-center space-x-2 py-2 px-6 hover:bg-[#ddd] transition-all cursor-pointer"
                      onClick={handleClickOption}
                    >
                      <MdReport size={20} /> <p>Report</p>
                    </div>
                    {tweet.user_id === user.id && (
                      <div
                        className="flex items-center space-x-2 text-red-500 border-t py-2 px-6 font-semibold hover:bg-red-200 transition-all cursor-pointer"
                        onClick={handleOpenModal}
                      >
                        <FaTrashAlt /> <p>Delete</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </NavLink>
        {tweet.retweet_id && (
          <ReplyingTo retweetId={tweet.retweet_id} email={tweet.reply_to} />
        )}
        <div className="dark:text-white">
          {renderTextWithLineBreaks(tweet.content)}
        </div>
        {tweet.image_url && (
          <img
            src={tweet.image_url}
            alt="tweet image"
            className="border mt-5"
          />
        )}
      </div>
      <div className="border-t border-b mx-4">
        <TweetButtons
          tweetId={tweet.id}
          isLiked={tweet.is_liked}
          retweetCount={tweet.retweet_count}
          likesCount={tweet.likes_count}
        />
      </div>
      {openReply === true ? (
        <div className="flex justify-end flex-col w-full">
          <TextEditor retweetId={tweet.id} email={tweet.user.email} />
          <button
            className="px-4 font-semibold text-red-500 underline self-end"
            onClick={() => setOpenReply(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex justify-between mx-4 py-6 border-b">
          <div>
            <img
              src={user.profile_image_url}
              alt={`avatar-${user.username}`}
              className="profile-image-small"
            />
          </div>
          <button
            className="bg-primary text-white text-[14x] font-bold rounded-full px-5 hover:brightness-125 transition-all"
            onClick={() => setOpenReply(true)}
          >
            Reply
          </button>
        </div>
      )}
      <RetweetList tweetId={tweet.id} />
    </div>
  );
};

export default TweetDetail;
