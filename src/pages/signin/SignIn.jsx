import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-screen gap-3">
      <div className="flex flex-col justify-center items-center text-center md:text-left md:w-1/3 min-h-screen">
        <h1 className="text-3xl font-semibold mb-8 text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text">
          Welcome to Planova
        </h1>
        <ReactHookForm />
      </div>

      <div className="md:w-1/2">
        <img
          src="/i4.jpeg"
          alt="Beautiful travel destination photo"
          className="w-full h-auto max-h-screen rounded-md shadow-md"
        />
      </div>
    </div>
  );
}

function ReactHookForm() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const res = await newRequest.post("/auth/signin", { email, password });

      // ✅ Extract token from response
      const { token, user } = res.data;

      // ✅ Store token & user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid credentials, please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <input
        {...register("email", {
          required: "Email is required",
        })}
        type="email"
        placeholder="Email"
        className="px-8 py-2 rounded border-2 border-cyan-900"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <input
        {...register("password", {
          required: "Password is must",
          minLength: {
            value: 4,
            message: "Password must be atleast 4 charecters",
          },
        })}
        type="password"
        placeholder="Password"
        className="px-8 py-2 rounded border-2 border-cyan-900"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}

      {/* Display server error */}
      {error && <p className="text-red-500">{error}</p>}

      <Button className="mt-4" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}

export default SignIn;
