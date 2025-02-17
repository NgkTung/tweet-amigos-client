import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";
import { NavLink } from "react-router-dom";
import { useStore } from "../store";
import { Skeleton } from "@mui/material";

const Sidebar = () => {
  const { user: currentUser } = useStore();

  const fetchUsers = async () => {
    const data = await getUsers();
    return data;
  };

  const { data: usersResponse, isPending } = useQuery({
    queryKey: ["get-users"],
    queryFn: fetchUsers,
    options: {
      staleTime: 5 * 60 * 1000,
    },
  });

  const topFollowers = usersResponse?.data
    ? usersResponse.data
        .sort((a, b) => b.follower_count - a.follower_count)
        .filter((user) => user.id !== currentUser.id)
        .slice(0, 3)
    : [];

  return (
    <div className="w-6/12 py-5 px-4">
      <div className="bg-gray-100 rounded-md p-4">
        <p className="text-[1.8vh] font-semibold mb-5">Who to follow:</p>
        {isPending ? (
          // Display loading skeleton if data is still loading
          <div>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 py-3 px-2 bg-white hover:brightness-90 transition-all"
              >
                <div className="w-1/4">
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={55}
                    height={55}
                  />
                </div>
                <div className="w-full">
                  <Skeleton animation="wave" className="w-full" height={30} />
                  <Skeleton animation="wave" className="w-full" height={20} />
                </div>
              </div>
            ))}
          </div>
        ) : topFollowers.length === 0 ? (
          // Display a message when there are no users
          <p>No users available</p>
        ) : (
          // Display top followers
          topFollowers.map((user) => (
            <NavLink key={user.id} to={`/user/${user.id}`}>
              <div className="flex items-center space-x-4 py-3 px-2 bg-white hover:brightness-90 transition-all">
                <div>
                  <img
                    src={user.profile_image_url}
                    alt="profile-image"
                    className="profile-image-small"
                  />
                </div>
                <div>
                  <p className="font-bold">{user.username}</p>
                  <p className="text-gray-500 font-semibold">{user.email}</p>
                </div>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
