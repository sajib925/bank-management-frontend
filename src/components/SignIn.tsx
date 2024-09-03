"use client"
import { useUserContext } from '@/context/userContext';
import { fetchCustomerData, fetchManagerData, fetchUserData } from '@/logic/apiService';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface FormData {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const router = useRouter();
  const { setUserData, setCustomerData, setManagerData } = useUserContext();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const loginMutation = useMutation(
    async (formData: FormData) => {
      const res = await axios.post('https://bank-management-backend.onrender.com/api/auth/login/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data.token;
    },
    {
      onSuccess: async (token) => {
        window.localStorage.setItem('authToken', token);
        
        try {
          const userData = await fetchUserData(token);
          const customerData = await fetchCustomerData(token);
          const managerData = await fetchManagerData(token);
          setUserData(userData);
          setCustomerData(customerData)
          setManagerData(managerData)
          const isCustomer = customerData?.some((c: any) => c.user === userData.id);
          const isManager = managerData?.some((m: any) => m.user === userData.id);
          if(isManager) {
            router.push("/managerDashboard")
          } else if (isCustomer) {
            router.push("/customerDashboard")
          } else {
            router.push("/userType")
          }
          toast.success('Login successfully');
        } catch (error) {
          toast.error('Failed to fetch user data');
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const responseData = error.response.data;
          const errorMessage = Object.values(responseData)
            .flat() 
            .join(' '); 
          toast.error(errorMessage);
        } else {
          toast.error('Something went wrong');
        }
      },
    }
  );

  

  const onSubmit = (formData: FormData) => {
    loginMutation.mutate(formData);
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 lg:gap-20 max-w-6xl w-full">
        <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Dining Experience"
            />
          </div>
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of possibilities. Your journey begins here.
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">User name</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    {...register("username", { required: "Username is required" })}
                    placeholder="Username"
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                  {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>
              </div>
              
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                     type="password"
                     {...register("password", { required: "Password is required" })}
                     placeholder="Password"
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={loginMutation.isLoading}
                >
                  {loginMutation.isLoading ? "Loading..." : " Log in"}
                 
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-800">
                {`Don't have an account`}
                <a href="/signUp" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
