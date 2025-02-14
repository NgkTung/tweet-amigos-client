import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";
import Loading from "./Loading";
import { useStore } from "../store";
import AmigosListItem from "./AmigosListItem";

const Amigos = () => {
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

  if (isFetching) return <Loading />;

  const listOfOtherAmigos = usersResponse.data.filter(
    (user) => user.id !== currentUser.id
  );

  return (
    <div>
      {usersResponse.data && listOfOtherAmigos.length === 0 ? (
        <div>No users available</div>
      ) : (
        <div className="p-4">
          <p className="font-bold text-[2.2vh] mb-5">
            <span className="text-primary">{listOfOtherAmigos.length}</span>{" "}
            other Amigos are like you:
          </p>
          {listOfOtherAmigos.map((user) => (
            <AmigosListItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Amigos;
