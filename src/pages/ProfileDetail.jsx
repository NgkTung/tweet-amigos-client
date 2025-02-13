import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/user";
import Loading from "../components/Loading";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDate } from "../utils";
import { useStore } from "../store";
import { useEffect, useState } from "react";
import { useToggleFollow } from "../store/user";

const ProfileDetail = () => {
  const { id } = useParams();
  const { user: currentUser } = useStore();
  const { mutate: toggleFollow, isPending: togglePending } = useToggleFollow();

  const fetchUserById = async () => {
    const data = await getUserById(id, currentUser.id);
    return data;
  };

  const {
    data: user,
    isPending,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["userById", id, currentUser.id],
    queryFn: fetchUserById,
  });

  const [isFollow, setIsFollow] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleFollow = () => {
    setIsFollow(!isFollow);
    toggleFollow({ userId: id, followerId: currentUser.id });
  };

  useEffect(() => {
    if (isSuccess) setIsFollow(user.is_followed);
  }, [isSuccess]);

  if (isPending) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="my-5">
      <div className="flex space-x-5 mb-4">
        <button onClick={handleBack} className="p-4">
          <IoMdArrowRoundBack size={20} />
        </button>
        <div>
          <p className="text-[18px] font-bold">{user.username}</p>
          <p className="text-gray-500 font-semibold">
            {user.tweet_count} Tweets
          </p>
        </div>
      </div>
      <div>
        <div
          className="px-6 bg-cover bg-no-repeat h-[200px] relative"
          style={{ backgroundImage: `url(${user.background_image_url})` }}
        >
          <div className="absolute top-32 left-5 right-5 flex justify-between items-end">
            <div>
              <img
                src={user.profile_image_url}
                alt="profile image"
                className="profile-image-large"
              />
            </div>
            {currentUser.id !== user.id && (
              <button
                className={`font-semibold rounded-full px-4 py-2 hover:brightness-125 transition-all border border-primary ${
                  isFollow ? "bg-white text-primary" : "bg-primary text-white "
                }`}
                onClick={() => handleToggleFollow()}
                disabled={togglePending}
              >
                {isFollow ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>
        <div className="px-4 mt-24">
          <p className="text-[20px] font-bold">{user.username}</p>
          <p className="text-gray-500 font-semibold">{user.email}</p>
          <p className="mt-4">{user.bio}</p>
        </div>
        {/* Display the joined date */}
        <div className="flex items-center space-x-2 px-4 text-gray-500 ">
          <FaCalendarAlt />
          <p className="font-semibold">Joined {formatDate(user.created_at)}</p>
        </div>
        {/* Display the number of follwers and following */}
        <div className="flex px-4 mt-5 space-x-4">
          <p className="text-gray-500 font-semibold">
            <span className="text-black text-bold">{user.following_count}</span>{" "}
            Following
          </p>
          <p className="text-gray-500 font-semibold">
            <span className="text-black text-bold">{user.follower_count}</span>{" "}
            {user.follower_count > 1 ? "Followers" : "Follower"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
