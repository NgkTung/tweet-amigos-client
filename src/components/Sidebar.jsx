import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";
import Loading from "./Loading";
import { NavLink } from "react-router-dom";
import { useStore } from "../store";

const Sidebar = () => {
  const { user: currentUser } = useStore();

  const fetchUsers = async () => {
    const data = await getUsers();
    console.log(data);
    return data;
  };

  const { data: usersResponse, isPending } = useQuery({
    queryKey: ["get-users"],
    queryFn: fetchUsers,
    options: {
      staleTime: 5 * 60 * 1000,
    },
  });

  if (isPending) return <Loading />;

  const topFollowers = usersResponse.data
    .sort((a, b) => b.follower_count - a.follower_count)
    .filter((user) => user.id !== currentUser.id)
    .slice(0, 3);

  return (
    <div className="w-6/12 py-5 px-4">
      <div className="bg-gray-100 rounded-md p-4">
        <p className="text-[1.8vh] font-semibold mb-5">Who to follow:</p>
        {topFollowers.length === 0 ? (
          <p>No users available</p>
        ) : (
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
