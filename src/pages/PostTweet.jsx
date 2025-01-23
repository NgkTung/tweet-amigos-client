import TextEditor from "../components/TextEditor";
import { useStore } from "../store";

const PostTweet = () => {
  const { showTextEditor, setShowTextEditor } = useStore();

  return (
    <>
      {showTextEditor && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center"
          onClick={setShowTextEditor}
        >
          <div className="w-full flex justify-center mt-20">
            <div
              className="bg-white rounded-lg w-full max-w-[650px] relative self-start max-h-[90%] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <TextEditor />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostTweet;
