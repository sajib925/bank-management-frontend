"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { fetchNormalUserData, fetchUserData } from "@/logic/apiService";
import { useUserContext } from "@/context/userContext";

interface NormalUserFormValues {
  mobile_no: string;
  nid: string;
  age: string;
  monthly_income: string;
  religion: string;
  account_type: string;
}

export const NormalUser = () => {
  const {userData, setUserData , normalUserData, setNormalUserData} = useUserContext();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<NormalUserFormValues>({
    defaultValues: {
      mobile_no: "",
      nid: "",
      age: "",
      monthly_income: "",
      religion: "",
      account_type: "",
    },
  });

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

      // if (!res.ok) {
      //   const errorData = await res.json();
      //   throw new Error(errorData.detail || "Error creating Patient Account");
      // }

      // return res.json();
    },
    onSuccess: async () => {
      const token = window.localStorage.getItem("authToken");
      if (!token) {
        toast.error("Auth token not found");
        return;
      }
      toast.success("Customer Account created successfully");
      router.push("/");
      const [ normalUserData] = await Promise.all([
        fetchNormalUserData(token),
      ]);


      const normalData =
        normalUserData.find((d:any) => d.user === userData.id) ?? null;

      setNormalUserData(normalData);

      try {
        const userData = await fetchUserData(token);
        setUserData(userData);
        router.push("/");
      } catch (error) {
        toast.error("Failed to fetch user data");
        router.push("/error");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error creating Patient Account");
    },
  });

  const onSubmit: SubmitHandler<NormalUserFormValues> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Create Patient Account</CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Age:</Label>
                <Input
                  type="text"
                  {...register("age", { required: "Age is required" })}
                  placeholder="Age"
                />
                {errors.age && <span>{errors.age.message}</span>}
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Mobile No.:</Label>
                <Input
                  type="text"
                  {...register("mobile_no", { required: "Mobile No. is required" })}
                  placeholder="Mobile No."
                />
                {errors.mobile_no && <span>{errors.mobile_no.message}</span>}
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">NID:</Label>
                <Input
                  type="text"
                  {...register("nid", { required: "NID is required" })}
                  placeholder="NID"
                />
                {errors.nid && <span>{errors.nid.message}</span>}
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Monthly Income:</Label>
                <Input
                  type="text"
                  {...register("monthly_income", { required: "Monthly Income is required" })}
                  placeholder="Monthly Income"
                />
                {errors.monthly_income && <span>{errors.monthly_income.message}</span>}
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Religion:</Label>
                <Input
                  type="text"
                  {...register("religion", { required: "Religion is required" })}
                  placeholder="Religion"
                />
                {errors.religion && <span>{errors.religion.message}</span>}
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Account Type:</Label>
                <Input
                  type="text"
                  {...register("account_type", { required: "Account Type is required" })}
                  placeholder="Account Type"
                />
                {errors.account_type && <span>{errors.account_type.message}</span>}
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="w-full" disabled={mutation.isLoading}>
                  {mutation.isLoading ? "Loading..." : "Create Patient"}
                </Button>
              </div>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};
