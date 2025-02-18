import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";
import { useStore } from "../store";
import AmigosListItem from "./AmigosListItem";
import { Skeleton } from "@mui/material";

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

  const listOfOtherAmigos = usersResponse?.data
    ? usersResponse.data.filter((user) => user.id !== currentUser.id)
    : [];

  return (
    <div>
      {isFetching ? (
        <div className="p-4">
          <p className="font-bold text-[2.2vh] mb-5 dark:text-white">
            <span className="text-primary">{listOfOtherAmigos.length}</span>{" "}
            other Amigos are like you:
          </p>
          {[...Array(6)].map((__, index) => (
            <div
              key={index}
              className="flex items-center space-x-5 p-4 border-t dark:bg-[#444]"
            >
              <Skeleton
                variant="circular"
                animation="wave"
                width={55}
                height={55}
              />
              <div>
                <Skeleton
                  width={index % 2 === 1 ? 200 : 250}
                  height={30}
                  animation="wave"
                />
                <Skeleton width={150} height={20} animation="wave" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4">
          <p className="font-bold text-[2.2vh] mb-5 dark:text-white">
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
