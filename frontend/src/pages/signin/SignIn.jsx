import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import newRequest from "../../utils/newRequest";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function SignIn() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left side with form */}
      <div className="flex flex-col justify-center items-center p-8 md:w-1/2 lg:w-2/5">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-yellow-600">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your Planova account</p>
          </div>
          <ReactHookForm />
          <div className="mt-8 text-center text-gray-600">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-yellow-600 hover:text-yellow-800 font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side with image */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5 relative overflow-hidden">
        <img
          src="/i4.jpeg"
          alt="Beautiful travel destination"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-700/40 flex items-center justify-center">
          <div className="text-white max-w-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Explore the world with Planova
            </h2>
            <p className="text-lg md:text-xl opacity-90">
              Plan your perfect trip with personalized itineraries and
              AI-powered recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReactHookForm() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const { email, password } = data;
      const res = await newRequest.post("/auth/signin", { email, password });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Show success feedback before redirecting
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setError(
        error.response?.data?.message ||
          "Invalid credentials, please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-5">
        {/* Email input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <FiMail />
          </div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            placeholder="Email address"
            className={`w-full px-4 py-3 pl-10 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-yellow-500 transition`}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <FiLock />
          </div>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full px-4 py-3 pl-10 rounded-lg border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-yellow-500 transition`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
          {errors.password && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Display server error */}
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Sign in button */}
        <Button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-yellow-900 text-white font-medium rounded-lg transition-all focus:ring-4 focus:ring-blue-300"
          disabled={isSubmitting || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </div>
    </form>
  );
}

export default SignIn;
