"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {  fetchManagerData, fetchUserData } from "@/logic/apiService";
import { useUserContext } from "@/context/userContext";
import {useCallback, useState} from "react";
import axios from "axios";
import {useDropzone} from "react-dropzone";
import Image from "next/image";
import {CameraIcon, UserIcon} from "@/lib/icons";

interface AdminFormValues {
  mobile_no: string;
  nid: string;
  age: string;
  religion: string;
  image: string;
}

export const AdminUser = () => {
  const { userData ,setUserData, managerData, setManagerData} = useUserContext();
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AdminFormValues>({
    defaultValues: {
      mobile_no: "",
      nid: "",
      age: "",
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
    mutationFn: async (formData: AdminFormValues) => {
      const authToken = window.localStorage.getItem("authToken") ?? "";
      const res = await fetch("https://bank-management-backend.onrender.com/api/account/manager/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      return res.json();
    },
    onSuccess: async () => {
      const token = window.localStorage.getItem("authToken");
      if (!token) {
        toast.error("Auth token not found");
        return;
      }

      toast.success("Manager created successfully");
      router.push("/managerDashboard");

      const [ managerData] = await Promise.all([
        fetchManagerData(token),
      ]);


      const adminData = managerData.find((d:any) => d.user === userData.id) ?? null;

      setManagerData(adminData);


      if (managerData?.id) {
        router.push("/managerDashboard");
      } else {
        router.push("/userType");
      }

      try {
        const userData = await fetchUserData(token);
        if (!userData) throw new Error("User data not found");
        setUserData(userData);
        router.push("/");
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
        router.push("/error");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error creating Admin User");
    },
  });

  const onSubmit: SubmitHandler<AdminFormValues> = (data) => {
    mutation.mutate(data);
    console.log(data)
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl pb-4">Create Manager Account</CardTitle>
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
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Mobile No.:</Label>
                <Input
                    type="text"
                    {...register("mobile_no", {required: "Mobile No. is required"})}
                    placeholder="Mobile No."
                />
                {errors.mobile_no && <span>{errors.mobile_no.message}</span>}
              </div>

              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">NID:</Label>
                <Input
                    type="text"
                    {...register("nid", {required: "NID is required"})}
                    placeholder="National ID"
                />
                {errors.nid && <span>{errors.nid.message}</span>}
              </div>

              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Age:</Label>
                <Input
                    type="text"
                    {...register("age", {required: "Age is required"})}
                    placeholder="Age"
                />
                {errors.age && <span>{errors.age.message}</span>}
              </div>

              {/* Religion Field (Dropdown) */}
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Religion:</Label>
                <select
                    {...register("religion", {required: "Religion is required"})}
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




              <div className="flex justify-end">
                <Button type="submit" className="" disabled={mutation.isLoading}>
                  {mutation.isLoading ? "Loading..." : "Create Manager"}
                </Button>
              </div>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};
