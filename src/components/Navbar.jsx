import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { VscSignOut } from "react-icons/vsc";
import logo from "../assets/main-logo.png";
import { useStore } from "../store";
import { useEffect, useState } from "react";
import { FaRegSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { setShowTextEditor } = useStore();
  const savedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(savedTheme);

  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Apply the theme to the <html> tag
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Store the theme preference in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-full w-5/12">
      <div className="flex flex-col gap-y-6 py-5 dark:text-white">
        <NavLink to="/">
          <p className="logo">Tweet Amigos</p>
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
            to="/amigos"
            className={({ isActive }) =>
              isActive ? "text-primary nav-link" : "nav-link"
            }
          >
            <FaUserGroup /> Amigos
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
        <p>
          <NavLink to="/logout" className="nav-link mt-5 text-red-500">
            <VscSignOut /> Log out
          </NavLink>
        </p>
        <button className="nav-link" onClick={() => toggleDarkMode()}>
          {theme === "dark" ? <FaMoon size={20} /> : <FaRegSun size={20} />}{" "}
          Theme
        </button>

        <button
          className="bg-primary text-white text-[2.5vh] font-bold rounded-full pt-1 pb-2 mx-10 my-5 hover:brightness-125 transition-all font-daruma"
          onClick={setShowTextEditor}
        >
          Tweet
        </button>
      </div>
    </div>
  );
};

export default Navbar;
