import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="w-full flex justify-center items-center my-5">
      <ReactLoading type="bubbles" color="#649dad" />
    </div>
  );
};

export default Loading;
