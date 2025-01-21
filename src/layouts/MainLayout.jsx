import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PostTweet from "../pages/PostTweet";

const MainLayout = () => {
  return (
    <div className="flex flex-row min-h-screen max-w-[1200px] mx-auto border-2 border-red-500">
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
