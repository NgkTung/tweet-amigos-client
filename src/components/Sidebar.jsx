import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";

const Sidebar = () => {
  const fetchUsers = async () => {
    const data = await getUsers();
    return data;
  };

  const { data } = useQuery({
    queryKey: ["get-users"],
    queryFn: fetchUsers,
  });

  return (
    <div className="w-6/12 py-5 px-4">
      <div className="bg-gray-100 rounded-md p-4">
        <p className="text-[1.8vh] font-semibold">Top contributors:</p>
      </div>
    </div>
  );
};

export default Sidebar;
