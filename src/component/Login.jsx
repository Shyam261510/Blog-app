import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [register, handelSubmit] = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-3 p-3">
      <h2 className="text-center font-bold text-lg">Sign in to your Accout</h2>
      {error && <p className="text-red-600 mt-8">{error} </p>}
      <form className="mt-7" onSubmit={handelSubmit(login)}>
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                  value
                ) || "Email address must be a valuid address",
            },
          })}
        />
      </form>
    </div>
  );
}

export default Login;
