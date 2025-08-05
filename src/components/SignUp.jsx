import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Logo, Input } from "../components/Index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const newSession = await authService.createAccount(data);
      if (newSession) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  // const handleGoogleLogin = () => {
  //   authService.googleLogin();
  // };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
  {/* Background Image Layer */}
  <div
    className="absolute inset-0 bg-cover bg-center brightness-50"
    style={{
      backgroundImage:
        "url('https://colibriwp.com/blog/wp-content/uploads/2019/11/poco-people.png')",
      zIndex: 0,
    }}
  ></div>

  {/* Foreground Container */}
  <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-10">
    {/* Logo */}
    <div className="mb-6 text-center">
      <h1 className="text-4xl font-extrabold tracking-wide text-gray-800">BLOGNest</h1>
    </div>

    {/* Heading */}
    <h2 className="text-center text-2xl font-semibold text-gray-700">Create your account</h2>
    <p className="mt-2 text-center text-sm text-gray-500">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 hover:underline font-medium">
        Sign In
      </Link>
    </p>

    {/* Error */}
    {error && <p className="text-red-500 mt-6 text-center text-sm">{error}</p>}

    {/* Google Signup Button */}
    <div className="mt-6">
      <button
        onClick={() => authService.googleLogin()}
        className="flex items-center justify-center gap-3 w-full bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition px-4 py-2"
      >
        <img
          src="https://wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/logos/google-logo.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="font-medium">Sign up with Google</span>
      </button>
    </div>

    {/* OR Separator */}
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-3 text-gray-500">or continue with email</span>
      </div>
    </div>

    {/* Signup Form */}
    <form onSubmit={handleSubmit(create)} className="space-y-5">
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        {...register("name", { required: true })}
      />
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        {...register("email", {
          required: true,
          validate: {
            matchPattern: (value) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Enter a valid email address",
          },
        })}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        {...register("password", { required: true })}
      />
      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  </div>
</div>

  )
}

export default SignUp;
