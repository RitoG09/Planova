import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";

function SignUp() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-screen gap-3">
      <div className="flex flex-col justify-center items-center text-center md:text-left md:w-1/3">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text">
          Create an account
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
      <div className="flex gap-5">
        <input
          {...register("firstname", {
            required: "Firstname is required",
          })}
          type="name"
          placeholder="Firstname"
          className="px-8 py-2 rounded border-2 border-cyan-900"
        />
        {errors.firstname && (
          <p className="text-red-500">{`${errors.firstname.message}`}</p>
        )}

        <input
          {...register("lastname", {
            required: "Lastname is required",
          })}
          type="name"
          placeholder="lastname"
          className="px-8 py-2 rounded border-2 border-cyan-900"
        />
        {errors.lastname && (
          <p className="text-red-500">{`${errors.lastname.message}`}</p>
        )}
      </div>

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
            value: 8,
            message: "Password must be atleast 8 charecters",
          },
        })}
        type="password"
        placeholder="Password"
        className="px-8 py-2 rounded border-2 border-cyan-900"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}

      <Button className="mt-4">Submit</Button>
    </form>
  );
}

export default SignUp;
