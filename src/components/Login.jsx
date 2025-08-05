//********************************************************************************** */
//*********************************LOGIN FORM***************************************
//********************************************************************************** */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from "../components/Index.js";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth.js";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  //const userData = useSelector((state) => state.auth.userData);
  // useEffect(() => {
  //   console.log("Redux store updated userData:", userData);
  // }, [userData]);

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
          // console.log("User Data before :",userData)
          dispatch(authLogin({ userData }));

        }

        navigate("/"); //forcefully redirecting to root
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGoogleLogin = () => {
    authService.googleLogin();
  };
  return (
  <>
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{
          backgroundImage: "url('https://colibriwp.com/blog/wp-content/uploads/2019/11/poco-people.png')",
          zIndex: 0,
        }}
      ></div>

      {/* Foreground container */}
      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Sign in to BlogNest</h1>
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition px-4 py-2 mb-6"
        >
          <img
            src="https://wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/logos/google-logo.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        {/* Email/password form */}
        {error && <p className="text-red-600 text-center text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  </>
);

}

export default Login;
