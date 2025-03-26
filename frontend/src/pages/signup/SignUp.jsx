import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import newRequest from "../../utils/newRequest";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function SignUp() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left side with image */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5 relative overflow-hidden">
        <img
          src="/i4.jpeg"
          alt="Beautiful travel destination"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-700/40 flex items-center justify-center">
          <div className="text-white max-w-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Planova community
            </h2>
            <p className="text-lg md:text-xl opacity-90">
              Sign up today and start planning unforgettable journeys with our
              AI-powered trip planner.
            </p>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex flex-col justify-center items-center p-8 md:w-1/2 lg:w-2/5">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-600">
              Create an Account
            </h1>
            <p className="text-gray-600">
              Join Planova to start planning your perfect trip
            </p>
          </div>
          <ReactHookForm />
          <div className="mt-8 text-center text-gray-600">
            <p>
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-yellow-600 hover:text-yellow-800 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReactHookForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onsubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const { firstname, lastname, email, password } = data;
      await newRequest.post("/auth/signup", {
        firstname,
        lastname,
        email,
        password,
      });

      setIsLoading(false);
      setSignupSuccess(true);

      // Redirect after showing success message
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        // Server responded with a status other than 200 range
        setError(
          err.response.data.message ||
            `Failed to sign up: ${err.response.status} ${err.response.statusText}`
        );
      } else if (err.request) {
        // Request was made but no response received
        setError("Failed to sign up: No response from server");
      } else {
        // Something else happened while setting up the request
        setError(`Failed to sign up: ${err.message}`);
      }
      console.error("Sign up error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="w-full">
      <div className="space-y-4">
        {/* Success message */}
        {signupSuccess && (
          <div className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 mb-4">
            <div className="flex">
              <svg
                className="h-5 w-5 text-green-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Account created successfully! Redirecting to login...</p>
            </div>
          </div>
        )}

        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <FiUser />
            </div>
            <input
              {...register("firstname", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
              type="text"
              placeholder="First name"
              className={`w-full px-4 py-3 pl-10 rounded-lg border ${
                errors.firstname ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
            {errors.firstname && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.firstname.message}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <FiUser />
            </div>
            <input
              {...register("lastname", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
              type="text"
              placeholder="Last name"
              className={`w-full px-4 py-3 pl-10 rounded-lg border ${
                errors.lastname ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
            {errors.lastname && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.lastname.message}
              </p>
            )}
          </div>
        </div>

        {/* Email field */}
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
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password field */}
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
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                message:
                  "Password must include at least one letter and one number",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full px-4 py-3 pl-10 rounded-lg border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
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

        {/* Password strength indicator */}
        {watch("password") && (
          <div className="space-y-2">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  watch("password").length < 5
                    ? "bg-red-500"
                    : watch("password").length < 8
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    (watch("password").length / 10) * 100
                  )}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">
              Password must be at least 5 characters long and include both
              letters and numbers.
            </p>
          </div>
        )}

        {/* Terms & Conditions */}
        <div className="flex items-start mt-4">
          <input
            {...register("terms", {
              required: "You must agree to the terms and conditions",
            })}
            id="terms"
            type="checkbox"
            className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="mt-1 text-red-500 text-sm">{errors.terms.message}</p>
        )}

        {/* Display server error */}
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Sign up button */}
        <Button
          type="submit"
          className="w-full py-3 px-4 mt-6 bg-gradient-to-r from-indigo-600 to-yellow-900 text-white font-medium rounded-lg transition-all focus:ring-4 focus:ring-yellow-300"
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
              Creating account...
            </span>
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>
    </form>
  );
}

export default SignUp;
