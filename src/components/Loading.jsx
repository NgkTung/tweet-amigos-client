import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const Loading = ({ type }) => {
  const [loadingType, setLoadingType] = useState("bubbles");
  useEffect(() => {
    if (type) setLoadingType(type);
  }, [type]);
  return (
    <div className="w-full flex justify-center items-center my-5">
      <ReactLoading type={loadingType} color="#649dad" />
    </div>
  );
};

Loading.propTypes = {
  type: PropTypes.string,
};

export default Loading;
