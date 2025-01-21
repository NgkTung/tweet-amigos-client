import TweetList from "../components/tweet/TweetList";

const Home = () => {
  return (
    <div>
      <div className="py-4 px-2 border-2 border-red-500">
        <p className="font-bold">Home</p>
      </div>
      <TweetList />
    </div>
  );
};

export default Home;
