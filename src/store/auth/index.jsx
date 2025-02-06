import { useMutation } from "@tanstack/react-query";
import { signin, signout, signup } from "../../api/auth";

const useSignin = () => {
  return useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.token);
    },
  });
};

const useSignout = () => {
  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
    },
  });
};

const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

const useAuth = () => {
  const token = localStorage.getItem("accessToken");
  return { isAuthenticated: !!token, token };
};

export { useSignin, useSignout, useSignup, useAuth };
