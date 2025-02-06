import { useEffect } from "react";
import { useAuth, useSignout } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const { mutate: signout, isLoading, error } = useSignout();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    signout();
  }, [signout]);

  useEffect(() => {
    console.log("Loading: ", isAuthenticated);
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page after successful logout
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return <div>LogoutPage</div>;
};

export default LogoutPage;
