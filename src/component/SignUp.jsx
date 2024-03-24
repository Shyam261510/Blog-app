import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import service from "../appwrite/config";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handelSubmit } = useForm();
  const create = async (data) => {
    setError("");
    try {
      const userData = await service.createAccount(data);
      if (userData) {
        const userData = await service.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch {
      console.log("signUp error");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <form onSubmit={handelSubmit(create)} className="flex flex-col gap-2">
        <Input
          label="full Name : "
          type="text"
          placeholder="enter your full name"
          {...register("fullName", {
            required: true,
          })}
        />
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
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
          })}
        />
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </div>
  );
}
export default SignUp;
