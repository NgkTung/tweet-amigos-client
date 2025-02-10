import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PostTweet from "../pages/PostTweet";
import { getUser } from "../api/user";
import { useStore } from "../store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const MainLayout = () => {
  const { setUser } = useStore();

  const fetchUser = async () => {
    const data = await getUser();
    return data;
  };

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    options: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  });

  useEffect(() => {
    if (error) {
      localStorage.removeItem("accessToken");
      location.reload();
    } else if (user) {
      setUser(user);
    }
  }, [user, setUser, error]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex flex-row min-h-screen max-w-[1200px] mx-auto">
      <Navbar />
      <main className="border-x-2 border-primary w-full">
        <Outlet />
        <PostTweet />
      </main>
      <SearchBar />
    </div>
  );
};

export default MainLayout;
