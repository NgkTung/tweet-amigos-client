import TextEditor from "../components/TextEditor";
import TweetList from "../components/tweet/TweetList";

const Home = () => {
  return (
    <div>
      <div className="p-4 mb-4 border-b border-grey-500">
        <p className="font-bold text-[20px] dark:text-white">Home</p>
      </div>
      <div className="border-b">
        <TextEditor />
      </div>
      <TweetList />
    </div>
  );
};

export default Home;
