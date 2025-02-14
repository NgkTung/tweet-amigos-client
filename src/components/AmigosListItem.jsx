import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useToggleFollow } from "../store/user";
import { useStore } from "../store";

const AmigosListItem = ({ user }) => {
  const { user: currentUser } = useStore();
  const [isFollowed, setIsFollowed] = useState(false);
  const { mutate: toggleFollow, isPending } = useToggleFollow();

  const handleToggleFollow = (e) => {
    e.preventDefault();
    setIsFollowed(!isFollowed);
    toggleFollow({ userId: user.id, followerId: currentUser.id });
  };

  useEffect(() => {
    setIsFollowed(user.is_followed);
  }, [user.is_followed]);

  return (
    <NavLink
      to={`/user/${user.id}`}
      className="flex items-center space-x-5 p-4 border-t bg-white hover:brightness-95 transition-all"
    >
      <div className="w-[80px]">
        <img
          src={user.profile_image_url}
          alt="profile image"
          className="profile-image-small"
        />
      </div>
      <div className="w-full">
        <p className="font-bold">{user.username}</p>
        <p className="font-semibold text-gray-500">{user.email}</p>
      </div>
      <button
        className={`font-semibold self-end rounded-full px-4 py-2 hover:brightness-125 transition-all border border-primary ${
          isFollowed ? "bg-white text-primary" : "bg-primary text-white "
        }`}
        onClick={(e) => handleToggleFollow(e)}
        disabled={isPending}
      >
        {isFollowed ? "Following" : "Follow"}
      </button>
    </NavLink>
  );
};

AmigosListItem.propTypes = {
  user: {
    id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    profile_image_url: PropTypes.string,
    is_follow: PropTypes.bool,
  },
};

export default AmigosListItem;
