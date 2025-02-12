import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import TweetDetail from "../pages/TweetDetail";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/authentication/LoginPage";
import LogoutPage from "../pages/authentication/LogoutPage";
import RegisterPage from "../pages/authentication/RegisterPage";
import ProfileDetail from "../pages/ProfileDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<MainLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/tweets/:id",
        element: <TweetDetail />,
      },
      {
        path: "/user/:id",
        element: <ProfileDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
