import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";
import { useStore } from "../store";
import Amigos from "../components/Amigos";

const ListOfAmigos = () => {
  const { user: currentUser } = useStore();

  const fetchUsers = async () => {
    const data = await getUsers(currentUser.id);
    return data;
  };
  const { data: usersResponse, isFetching } = useQuery({
    queryKey: ["get-users", currentUser.id],
    queryFn: fetchUsers,
    options: {
      staleTime: 5 * 60 * 1000,
    },
  });

  const listOfOtherAmigos = usersResponse?.data
    ? usersResponse.data.filter((user) => user.id !== currentUser.id)
    : [];
  return (
    <div>
      <p className="font-bold text-[2.2vh] dark:text-white p-4">
        <span className="text-primary">{listOfOtherAmigos.length}</span> other
        Amigos are like you:
      </p>
      <Amigos
        data={listOfOtherAmigos}
        isFetching={isFetching}
        followBtn={true}
      />
    </div>
  );
};

export default ListOfAmigos;
