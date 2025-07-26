//********************************************************************************** */
//*********************************LOGIN FORM***************************************
//********************************************************************************** */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "../components/Index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth/";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); 
  const userDat = useSelector((state) => state.auth.userData);
useEffect(() => {
  console.log("Redux store updated userData:", userDat);
}, [userDat]);

  //this is used to check if the user data is updated in the store after login
  //it makes the code short.
  //instead of using email and password state variable and a seperate function for handling submission, we can use this.
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          console.log("User Data before :",userData)
          dispatch(authLogin(userData));
          
        }
        
        navigate("/"); //forcefully redirecting to root
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center">
  {/* Background image layer */}
  <div
    className="absolute inset-0 bg-center bg-cover filter blur-none brightness-50"
    style={{
      backgroundImage: "url('https://colibriwp.com/blog/wp-content/uploads/2019/11/poco-people.png')",
      zIndex: 0,
    }}
  ></div>

  {/* Foreground form container */}
  <div className="relative z-10 w-full max-w-lg bg-auto bg-opacity-100 backdrop-blur-md p-18 rounded-xl shadow-lg">
    <div className="mb-2 flex justify-center">
      <span className="inline-block mr-15 mb-10 text-white font-bold w-full max-w-[100px]">
        <p className="text-4xl">BLOGNest</p>
      </span>
    </div>
    <h2 className="text-center text-2xl font-bold text-white leading-tight">
      Sign in to your account
    </h2>
    <p className="mt-2 text-center text-base text-white">
      Don&apos;t have any account?&nbsp;
      <Link
        to="/signup"
        className="font-medium text-primary transition-all duration-200 hover:underline"
      >
        Sign Up
      </Link>
    </p>
    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    <form onSubmit={handleSubmit(login)} className="mt-8">
      <div className="space-y-5">
        <Input
          label="Email: "
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <Input
          label="Password: "
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
          })}
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </div>
    </form>
  </div>
</div>
  );
}

export default Login;
