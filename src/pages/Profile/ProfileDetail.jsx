import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import {
  getFollowersByUserId,
  getFollowingsByUserId,
  getUserById,
} from "../../api/user";
import Loading from "../../components/Loading";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDate } from "../../utils";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import { useToggleFollow } from "../../store/user";
import TabPanel from "../../components/TabPanel";
import TweetList from "../../components/tweet/TweetList";
import { Tab, Tabs } from "@mui/material";
import { getTweetsByUserId } from "../../api/tweet";
import Amigos from "../../components/Amigos";

const ProfileDetail = () => {
  const { id } = useParams();
  const { user: currentUser } = useStore();
  const { mutate: toggleFollow, isPending: togglePending } = useToggleFollow();
  const [value, setValue] = useState(0);

  const fetchUserById = async () => {
    const data = await getUserById(id, currentUser.id);
    return data;
  };

  const fetchTweetsByUserId = async () => {
    const data = await getTweetsByUserId(id);
    return data;
  };

  const fetchFollowers = async () => {
    const data = await getFollowersByUserId(id);
    return data;
  };

  const fetchFollowings = async () => {
    const data = await getFollowingsByUserId(id);
    return data;
  };

  const {
    data: user,
    isPending,
    isSuccess,
    error: userError,
  } = useQuery({
    queryKey: ["userById", id, currentUser.id],
    queryFn: fetchUserById,
    enabled: !!currentUser.id,
  });

  const {
    data: tweetsResponse,
    isFetching: isTweetFetching,
    error: tweetsError,
  } = useQuery({
    queryKey: ["get-tweets-by-user-id", id],
    queryFn: fetchTweetsByUserId,
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // Set a 5-minute stale time
    refetchOnReconnect: true,
  });

  const {
    data: followersResponse,
    isFetching: isFollowerFetching,
    error: followerError,
  } = useQuery({
    queryKey: ["get-followers-by-user-id", id],
    queryFn: fetchFollowers,
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // Set a 5-minute stale time
    refetchOnReconnect: true,
  });

  const {
    data: followingsResponse,
    isFetching: isFollowingFetching,
    error: followingError,
  } = useQuery({
    queryKey: ["get-followings-by-user-id", id],
    queryFn: fetchFollowings,
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // Set a 5-minute stale time
    refetchOnReconnect: true,
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

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isSuccess) setIsFollow(user.is_followed);
  }, [isSuccess]);

  if (isPending) return <Loading />;
  if (userError || tweetsError || followerError || followingError)
    return (
      <p className="text-red-500">
        Error:{" "}
        {userError.message ||
          tweets.message ||
          followerError.message ||
          followingError}
      </p>
    );

  const tweets = tweetsResponse?.data ? tweetsResponse.data : [];
  const followers = followersResponse?.data ? followersResponse.data : [];
  const followings = followingsResponse?.data ? followingsResponse.data : [];

  return (
    <div className="my-5">
      <div className="flex space-x-5 mb-4">
        <button onClick={handleBack} className="p-4">
          <IoMdArrowRoundBack size={20} className="dark:text-white" />
        </button>
        <div>
          <p className="text-[18px] font-bold dark:text-white">
            {user.username}
          </p>
          <p className="text-gray-500 font-semibold dark:text-white">
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
                  isFollow ? "text-primary" : "bg-primary text-white "
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
          <p className="text-[20px] font-bold dark:text-white">
            {user.username}
          </p>
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
            <span className="text-black text-bold dark:text-white">
              {user.following_count}
            </span>{" "}
            Following
          </p>
          <p className="text-gray-500 font-semibold">
            <span className="text-black text-bold dark:text-white">
              {user.follower_count}
            </span>{" "}
            {user.follower_count > 1 ? "Followers" : "Follower"}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          className="text-primary"
        >
          <Tab label="Tweets" />
          <Tab label="Followers" />
          <Tab label="Following" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <TweetList tweets={tweets} isFetching={isTweetFetching} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Amigos data={followers} isFetching={isFollowerFetching} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Amigos data={followings} isFetching={isFollowingFetching} />
        </TabPanel>
      </div>
    </div>
  );
};

export default ProfileDetail;
