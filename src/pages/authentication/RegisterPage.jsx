import { useEffect, useState } from "react";
import { useAuth, useSignup } from "../../store/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import logo from "../../assets/main-logo.png";
import constant from "../../constants";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const RegisterPage = () => {
  const EMAIL_REGEX = constant.emailRegex;
  const {
    mutate: register,
    isLoading,
    isPending,
    isSuccess,
    error,
  } = useSignup();
  const [helperText, setHelperText] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e, name) => {
    setHelperText({ ...helperText, [name]: "" });
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleRegister = () => {
    // Initialize an object to track validation errors
    const errors = {};

    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      errors.email = "Invalid email!";
    }

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    // Validate password
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    // Confirm password
    if (
      (formData.password.trim() &&
        formData.password !== formData.confirmPassword) ||
      (!formData.password.trim() && !formData.confirmPassword.trim())
    ) {
      errors.confirmPassword = "Password not match";
    }

    // Update helper text with errors (if any)
    setHelperText((prevHelperText) => ({ ...prevHelperText, ...errors }));

    // If no errors, proceed with login
    if (Object.keys(errors).length === 0) {
      const { email, username, password } = formData;
      register({ email, username, password });
    }
  };

  useEffect(() => {
    if (error && error.response.data.detail === "User already registered") {
      setHelperText({ ...helperText, email: "Email already registered" });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess === true) {
      toast.success("Your account has been created!");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen relative">
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
        <h2 className="text-[24px] font-bold tracking-wider">Register</h2>
        <TextField
          label="Email"
          variant="standard"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
          fullWidth
          className="max-w-[400px]"
          helperText={helperText.email}
          error={helperText.email !== ""}
          required
        />
        <TextField
          label="Username"
          variant="standard"
          value={formData.username}
          onChange={(e) => handleChange(e, "username")}
          fullWidth
          className="max-w-[400px]"
          sx={{
            mt: 2,
          }}
          helperText={helperText.username}
          error={helperText.username !== ""}
          required
        />
        <TextField
          label="Password"
          variant="standard"
          value={formData.password}
          onChange={(e) => handleChange(e, "password")}
          fullWidth
          className="max-w-[400px]"
          sx={{
            mt: 2,
          }}
          type="password"
          helperText={helperText.password}
          error={
            helperText.password !== "" || helperText.confirmPassword !== ""
          }
          required
        />
        <TextField
          label="Confirm Password"
          variant="standard"
          value={formData.confirmPassword}
          onChange={(e) => handleChange(e, "confirmPassword")}
          fullWidth
          className="max-w-[400px]"
          sx={{
            mt: 2,
          }}
          type="password"
          helperText={helperText.confirmPassword}
          error={helperText.confirmPassword !== ""}
          required
        />
        <div className="w-full flex justify-end max-w-[400px]">
          <p className="mt-5">
            Already have an account?{" "}
            <span className="text-[#649dad]">
              <NavLink to="/register">Login</NavLink>
            </span>
          </p>
        </div>
        <button
          onClick={handleRegister}
          className="mt-10 bg-[#649dad] text-white w-full max-w-[400px] rounded-sm py-2 font-bold text-[18px] tracking-wider"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
