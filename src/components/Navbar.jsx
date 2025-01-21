import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import logo from "../assets/main-logo.png";
import { useStore } from "../store";

const Navbar = () => {
  const { setShowTextEditor } = useStore();
  return (
    <div className="min-h-full w-5/12">
      <div className="flex flex-col gap-y-6 py-5">
        <NavLink to="/">
          <img
            src={logo}
            alt="Tweet Amigos Logo"
            className="w-[250px] h-[60px] object-cover"
          />
        </NavLink>
        <p>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary nav-link" : "nav-link"
            }
          >
            <MdHome /> Home
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-primary nav-link" : "nav-link"
            }
          >
            <BsFillInfoCircleFill /> About
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-primary nav-link" : "nav-link"
            }
          >
            <FaUserCircle /> Profile
          </NavLink>
        </p>
        <button
          className="bg-primary text-white text-[20px] font-bold rounded-full py-3 mx-10 my-5 hover:brightness-125 transition-all"
          onClick={setShowTextEditor}
        >
          Tweet
        </button>
      </div>
    </div>
  );
};

export default Navbar;
