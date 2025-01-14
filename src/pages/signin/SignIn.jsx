import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { data } from "react-router-dom";

function SignIn() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-screen gap-3">
      <div className="text-center md:text-left md:w-1/3">
        <h1 className="text-4xl font-bold text-center items-center">
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onsubmit = async (data) => {
    //Submit to server
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-y-2">
      <input
        {...register("email", {
          required: "Email is required",
        })}
        type="email"
        placeholder="Email"
        className="px-3 py-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <input
        {...register("password", {
          required: "Password is must",
          minLength: {
            value: 8,
            message: "Password must be atleast 8 charecters",
          },
        })}
        type="password"
        placeholder="Password"
        className="px-3 py-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}
      <input
        {...register("confirmPassword", { required: "Confirm the password" })}
        type="password"
        placeholder="Confirm Password"
        className="px-3 py-2 rounded"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}
      <Button>Submit</Button>
    </form>
  );
}

export default SignIn;
