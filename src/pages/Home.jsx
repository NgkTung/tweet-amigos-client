import TextEditor from "../components/TextEditor";
import TweetList from "../components/tweet/TweetList";

const Home = () => {
  return (
    <div>
      <div className="py-4 px-2 mb-4 border-b border-grey-500">
        <p className="font-bold text-[20px]">Home</p>
      </div>
      <div className="border-b">
        <TextEditor />
      </div>
      <TweetList />
    </div>
  );
};

export default Home;
