"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";

interface FormData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const mutation = useMutation(
    async (formData: FormData) => {
      const response = await axios.post(
        "https://bank-management-backend.onrender.com/api/auth/register/",
        formData
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("Account created successfully");
        router.push("/signIn");
      },
      onError: (error: AxiosError) => {
        if (error.response?.data) {
          const responseData = error.response.data;
          const errorMessage = Object.values(responseData).flat().join(" ");
          toast.error(errorMessage);
        } else {
          toast.error("Something went wrong");
        }
      },
    }
  );

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-16">
        <h4 className="text-gray-800 text-base font-semibold mt-6">
          Sign up into your account
        </h4>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Username:
            </label>
            <input
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              {...register("username", { required: "Username is required" })}
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              First Name
            </label>
            <input
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              {...register("first_name", {
                required: "First name is required",
              })}
              placeholder="First Name"
            />
            {errors.first_name && (
              <p className="text-red-500">{errors.first_name.message}</p>
            )}
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Last Name
            </label>
            <input
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              {...register("last_name", { required: "Last name is required" })}
              placeholder="Last Name"
            />
            {errors.last_name && (
              <p className="text-red-500">{errors.last_name.message}</p>
            )}
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
            <input
              type="email"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <input
              type="password"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Confirm Password
            </label>
            <input
              type="password"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              {...register("confirm_password", {
                required: "Please confirm your password",
              })}
              placeholder="Confirm Password"
            />
            {errors.confirm_password && (
              <p className="text-red-500">{errors.confirm_password.message}</p>
            )}
          </div>
        </div>

        <div className="!mt-12 flex items-center justify-end">
          <button
            type="submit"
            className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Loading..." : "Sign up"}

          </button>
        </div>
      </form>

    </div>
  );
};

export default SignUp;

