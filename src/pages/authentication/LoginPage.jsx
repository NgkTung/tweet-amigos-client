import { useEffect, useState } from "react";
import { useAuth, useSignin } from "../../store/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import logo from "../../assets/main-logo.png";
import constant from "../../constants";
import Loading from "../../components/Loading";

const LoginPage = () => {
  const EMAIL_REGEX = constant.emailRegex;
  const { mutate: login, isLoading, isPending, error } = useSignin();
  const [helperText, setHelperText] = useState({
    email: "",
    password: "",
  });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setHelperText({ ...helperText, email: "" });
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setHelperText({ ...helperText, password: "" });
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Initialize an object to track validation errors
    const errors = {};

    // Validate email
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = "Invalid email!";
    }

    // Validate password
    if (!password.trim()) {
      errors.password = "Password is required";
    }

    // Update helper text with errors (if any)
    setHelperText((prevHelperText) => ({ ...prevHelperText, ...errors }));

    // If no errors, proceed with login
    if (Object.keys(errors).length === 0) {
      login({ email, password });
    }
  };

  useEffect(() => {
    if (error) {
      setHelperText({ ...alert, password: "Email or password is incorrect" });
    }
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {(isLoading || isPending) && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 flex items-center justify-center z-50">
          <Loading type="spinningBubbles" />
        </div>
      )}
      <div className="flex flex-col items-center max-w-[600px] py-20 w-full shadow-lg rounded-md">
        <div>
          <img
            src={logo}
            alt="Logo"
            className="w-[250px] h-[60px] mb-10 object-cover"
          />
        </div>
        <h2 className="text-[24px] font-bold tracking-wider">Login</h2>
        <TextField
          label="Email"
          variant="standard"
          value={email}
          onChange={handleChangeEmail}
          fullWidth
          className="max-w-[400px]"
          helperText={helperText.email}
          error={helperText.email !== ""}
        />
        <TextField
          label="Password"
          variant="standard"
          value={password}
          onChange={handleChangePassword}
          fullWidth
          className="max-w-[400px]"
          sx={{
            mt: 2,
          }}
          type="password"
          helperText={helperText.password}
          error={helperText.password !== ""}
        />
        <div className="w-full flex justify-end max-w-[400px]">
          <p className="text-[#649dad] mt-5">
            <NavLink to="/register">Create new account</NavLink>
          </p>
        </div>
        <button
          onClick={handleLogin}
          className="mt-10 bg-[#649dad] text-white w-full max-w-[400px] rounded-sm py-2 font-bold text-[18px] tracking-wider"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
