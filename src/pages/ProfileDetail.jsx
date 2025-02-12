import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/user";
import Loading from "../components/Loading";

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const fetchUserById = async () => {
    const data = await getUserById(id);
    return data;
  };

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["userById", id],
    queryFn: fetchUserById,
  });

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
            <button className="bg-primary text-white font-semibold rounded-md px-4 py-2">
              Edit profile
            </button>
          </div>
        </div>
        <div className="px-4 mt-24">
          <p className="text-[20px] font-bold">{user.username}</p>
          <p className="text-gray-500 font-semibold">{user.email}</p>
          <p className="mt-4">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
