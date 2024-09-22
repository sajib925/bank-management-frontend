"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useMutation } from "react-query";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserContext } from "@/context/userContext";
import { useForm } from "react-hook-form";
import { fetchUserData } from "@/logic/apiService";

interface UserPass {
  new_password: string;
  confirm_password: string;
  old_password: string;
}

interface UserProfileData {
  email: string;
  first_name: string;
  last_name: string;
}

const UserProfile: React.FC = () => {
  const {managerData,customerData} = useUserContext()
  const { userData, setUserData } = useUserContext();
  const [modalClose, setModalClose] = useState(false);
  const [modalClosePass, setModalClosePass] = useState(false);
  const manager = Array.isArray(managerData) ? managerData.find((m) => m.user === userData.id) : null;
  const customer = Array.isArray(customerData) ? customerData.find((c) => c.user === userData.id) : null;
  console.log(manager)
  console.log(customer)
  const {
    register,
    handleSubmit: handleProfileSubmit,
    reset,
    formState: { isSubmitting: isUpdatingProfile },
  } = useForm<UserProfileData>({
    defaultValues: {
      email: userData.email || "",
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { isSubmitting: isUpdatingPassword },
  } = useForm<UserPass>({
    defaultValues: {
      new_password: "",
      confirm_password: "",
      old_password: "",
    },
  });

  useEffect(() => {
    if (modalClose) {
      reset({
        email: userData.email || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
      });
    }
  }, [modalClose, reset, userData]);

  const refetchUserData = async () => {
    const token = window.localStorage.getItem("authToken");
    const updatedUserData = await fetchUserData(token);
    setUserData(updatedUserData);
  };

  const { mutateAsync: updateProfile } = useMutation(
    async (data: UserProfileData) => {
      const token = window.localStorage.getItem("authToken");
      await axios.patch(
        "https://bank-management-backend.onrender.com/api/auth/update-profile/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
    },
    {
      onSuccess: async () => {
        await refetchUserData();
        toast.success("User data updated successfully");
        setModalClose(false);
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const responseData = error.response.data;
          const errorMessage = Object.values(responseData).flat().join(" ");
          toast.error(errorMessage);
        } else {
          toast.error("Something went wrong");
        }
      },
    }
  );

  const { mutateAsync: updatePassword } = useMutation(
    async (data: UserPass) => {
      const token = window.localStorage.getItem("authToken");
      await axios.put(
        "https://bank-management-backend.onrender.com/api/auth/update-password/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
    },
    {
      onSuccess: async () => {
        await refetchUserData();
        toast.success("Password updated successfully");
        setModalClosePass(false);
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const responseData = error.response.data;
          const errorMessage = Object.values(responseData).flat().join(" ");
          toast.error(errorMessage);
        } else {
          toast.error("Something went wrong");
        }
      },
    }
  );

  const onProfileSubmit = async (data: UserProfileData) => {
    await updateProfile(data);
  };

  const onPasswordSubmit = async (data: UserPass) => {
    await updatePassword(data);
  };

  const name = `${userData.first_name} ${userData.last_name}`;


  return (
    <div className="max-w-screen-xl w-full mx-auto px-5">
      <h1 className="py-3 text-2xl lg:text-3xl font-bold text-center">
        <span className="block text-center">Hello {name}!</span> Welcome to your
        Profile
      </h1>
      <p className="text-xl text-gray-700 mb-5 text-center">Manage your personal information, update details, and view account activity seamlessly.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-y-4 gap-x-20">
        <Image
          src={"/image/profile.jpg"}
          width={400}
          height={300}
          alt="login"
        />
        <div>
          <Card>
            <div className="relative h-[150px] w-full rounded-t-sm bg-primary">
              {
                manager ? (
                    <Image
                        className="absolute left-[50%] top-[0%] -translate-x-[50%] transform rounded-full"
                        src={manager.image || "/image/profi.png"}
                        alt={"avatar"}
                        width={250}
                        height={250}
                    />
                ) : customer ? (
                    <Image
                        className="absolute left-[50%] top-[0%] -translate-x-[50%] transform rounded-full"
                        src={customer.image || "/image/profi.png"}
                        alt={"avatar"}
                        width={250}
                        height={250}
                    />
                ) : (
                    <Image
                        className="absolute left-[50%] top-[0%] -translate-x-[50%] transform rounded-full"
                        src={"/image/profi.png"}
                        alt={"avatar"}
                        width={250}
                        height={250}
                    />
                )
              }

            </div>
            <CardHeader className="px-0 pb-0 pt-28 text-center text-xl lg:text-2xl font-bold">
              {name}
            </CardHeader>

            <CardDescription className="pt-2 text-center text-xl lg:text-2xl font-semibold">
              {
                customer ? (
                    customer.account_type
                ) : manager ? (
                    "Manager"
                ) : (
                    "User"
                )
              }
            </CardDescription>
            <CardHeader className="px-0 pb-0 pt-3 text-center text-xl lg:text-2xl font-bold">
              {userData.email}
            </CardHeader>
            <CardFooter className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
              <Dialog onOpenChange={setModalClose} open={modalClose}>
                <DialogTrigger className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">
                  Update Profile
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Your Profile</DialogTitle>
                    <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
                      <div className="pb-5 flex flex-col gap-3">
                        <Label>Email:</Label>
                        <Input
                          type="email"
                          id="email"
                          {...register("email", { required: true })}
                          placeholder="Email"
                        />
                      </div>
                      <div className="pb-5 flex flex-col gap-3">
                        <Label>First Name:</Label>
                        <Input
                          id="first_name"
                          {...register("first_name", { required: true })}
                          placeholder="First Name"
                        />
                      </div>
                      <div className="pb-5 flex flex-col gap-3">
                        <Label>Last Name:</Label>
                        <Input
                          id="last_name"
                          {...register("last_name", { required: true })}
                          placeholder="Last Name"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isUpdatingProfile}
                      >
                        {isUpdatingProfile ? "Updating..." : "Update Profile"}
                      </Button>
                    </form>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog onOpenChange={setModalClosePass} open={modalClosePass}>
                <DialogTrigger className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">
                  Update Password
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Your Password</DialogTitle>
                    <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                      <div className="pb-5 flex flex-col gap-3">
                        <Label>New Password:</Label>
                        <Input
                          type="password"
                          id="new_password"
                          {...registerPassword("new_password", {
                            required: true,
                          })}
                          placeholder="New Password"
                        />
                      </div>
                      <div className="pb-5 flex flex-col gap-3">
                        <Label>Confirm New Password:</Label>
                        <Input
                          type="password"
                          id="confirm_password"
                          {...registerPassword("confirm_password", {
                            required: true,
                          })}
                          placeholder="Confirm Password"
                        />
                      </div>
                      <div className="pb-5 flex flex-col gap-3">
                        <Label>Old Password:</Label>
                        <Input
                          type="password"
                          id="old_password"
                          {...registerPassword("old_password", {
                            required: true,
                          })}
                          placeholder="Old Password"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isUpdatingPassword}
                      >
                        {isUpdatingPassword ? "Updating..." : "Update Password"}
                      </Button>
                    </form>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
