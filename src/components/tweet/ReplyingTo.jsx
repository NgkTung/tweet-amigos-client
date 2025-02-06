import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ReplyingTo = ({ retweetId, email }) => {
  return (
    <div className="mb-2">
      <NavLink to={`/tweets/${retweetId}`}>
        <p className="text-gray-400">
          Replying to <span className="text-blue-500 font-bold">{email}</span>
        </p>
      </NavLink>
    </div>
  );
};

ReplyingTo.propTypes = {
  retweetId: PropTypes.string,
  email: PropTypes.email,
};

export default ReplyingTo;
