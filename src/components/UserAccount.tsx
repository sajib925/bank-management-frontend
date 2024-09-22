"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { fetchCustomerData, fetchUserData } from "@/logic/apiService";
import { useUserContext } from "@/context/userContext";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useCallback, useState } from "react";
import Image from "next/image";
import {CameraIcon, UserIcon} from "@/lib/icons";

interface NormalUserFormValues {
  mobile_no: string;
  nid: string;
  age: string;
  monthly_income: string;
  account_type: string;
  religion: string;
  image: string;
}

export const NormalUser = () => {
  const { userData, setUserData, customerData, setCustomerData } = useUserContext();
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<NormalUserFormValues>({
    defaultValues: {
      mobile_no: "",
      nid: "",
      age: "",
      monthly_income: "",
      account_type: "",
      religion: "",
      image: "",
    },
  });

  const [imageUrl, setImageUrl] = useState(""); // State to store the uploaded image URL

  // Image upload handler using Dropzone and Cloudinary
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload_preset");

    axios
        .post("https://api.cloudinary.com/v1_1/dioutvghc/image/upload", formData)
        .then((response) => {
          const uploadedImageUrl = response.data.secure_url;
          setImageUrl(uploadedImageUrl);
          setValue("image", uploadedImageUrl);
          toast.success("Image uploaded successfully");
        })
        .catch((error) => {
          toast.error("Image upload failed");
          console.error("Error uploading image:", error);
        });
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const mutation = useMutation({
    mutationFn: async (formData: NormalUserFormValues) => {
      const authToken = window.localStorage.getItem("authToken") ?? "";
      const res = await fetch("https://bank-management-backend.onrender.com/api/account/customer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
    },
    onSuccess: async () => {
      const token = window.localStorage.getItem("authToken");
      if (!token) {
        toast.error("Auth token not found");
        return;
      }
      toast.success("Customer Account created successfully");
      router.push("/customerDashboard");

      const [customerData] = await Promise.all([fetchCustomerData(token)]);
      const customer = customerData.find((d: any) => d.user === userData.id) ?? null;
      setCustomerData(customer);

      try {
        const userData = await fetchUserData(token);
        setUserData(userData);
        router.push("/customerDashboard");
      } catch (error) {
        toast.error("Failed to fetch user data");
        router.push("/error");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error creating Customer Account");
    },
  });

  const onSubmit: SubmitHandler<NormalUserFormValues> = (data) => {
    mutation.mutate(data);
    console.log(data)
  };

  return (
      <div className="max-w-[1000px] w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl pb-4">Create Customer Account</CardTitle>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Image Upload Field */}
                <div className="pb-5 flex items-center justify-center gap-3">
                  <div {...getRootProps({className: "dropzone w-auto"})}>
                    <input {...getInputProps()} />
                    <div className='inline-flex items-center justify-center cursor-pointer'>
                      <div className="w-auto relative">
                        <div className="overflow-hidden border border-gray-200 rounded-full text-gray-600 w-24 h-24">
                          {
                            imageUrl ? (
                                <Image src={imageUrl} alt="Uploaded Image" className="w-full h-full object-cover" width={80} height={80} />
                            ) : (
                                <UserIcon />
                            )
                          }
                        </div>
                        <div className='absolute top-[50%] -right-2 z-20'>
                          <CameraIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Mobile Number Field */}
                <div className="pb-5 flex flex-col gap-3">
                  <Label className="text-base">Mobile Number:</Label>
                  <Input
                      type="text"
                      {...register("mobile_no", { required: "Mobile number is required" })}
                      placeholder="Mobile Number"
                  />
                  {errors.mobile_no && <span>{errors.mobile_no.message}</span>}
                </div>

                {/* NID Field */}
                <div className="pb-5 flex flex-col gap-3">
                  <Label className="text-base">NID:</Label>
                  <Input
                      type="text"
                      {...register("nid", { required: "NID is required" })}
                      placeholder="National ID"
                  />
                  {errors.nid && <span>{errors.nid.message}</span>}
                </div>

                {/* Age Field */}
                <div className="pb-5 flex flex-col gap-3">
                  <Label className="text-base">Age:</Label>
                  <Input
                      type="text"
                      {...register("age", { required: "Age is required" })}
                      placeholder="Age"
                  />
                  {errors.age && <span>{errors.age.message}</span>}
                </div>

                {/* Monthly Income Field */}
                <div className="pb-5 flex flex-col gap-3">
                  <Label className="text-base">Monthly Income:</Label>
                  <Input
                      type="text"
                      {...register("monthly_income", { required: "Monthly income is required" })}
                      placeholder="Monthly Income"
                  />
                  {errors.monthly_income && <span>{errors.monthly_income.message}</span>}
                </div>

                {/* Account Type Field (Dropdown) */}
                <div className="pb-5 flex flex-col gap-3">
                  <Label className="text-base">Account Type:</Label>
                  <select
                      {...register("account_type", { required: "Account type is required" })}
                      className="border rounded-md p-2"
                  >
                    <option value="">Select Account Type</option>
                    <option value="SAVINGS">Savings Account</option>
                    <option value="CHECKING">Checking Account</option>
                    <option value="BUSINESS">Business Account</option>
                    <option value="JOINT">Joint Account</option>
                    <option value="CURRENT">Current Account</option>
                  </select>
                  {errors.account_type && <span>{errors.account_type.message}</span>}
                </div>

                {/* Religion Field (Dropdown) */}
                <div className="pb-5 flex flex-col gap-3">
                  <Label className="text-base">Religion:</Label>
                  <select
                      {...register("religion", { required: "Religion is required" })}
                      className="border rounded-md p-2"
                  >
                    <option value="">Select Religion</option>
                    <option value="ISLAM">Islam</option>
                    <option value="CHRISTIANITY">Christianity</option>
                    <option value="HINDUISM">Hinduism</option>
                    <option value="BUDDHISM">Buddhism</option>
                    <option value="JUDAISM">Judaism</option>
                    <option value="ATHEISM">Atheism</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {errors.religion && <span>{errors.religion.message}</span>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button type="submit" className="" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Loading..." : "Create Customer"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
  );
};
