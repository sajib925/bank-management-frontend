"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { fetchAdminUserData, fetchUserData } from "@/logic/apiService";
import { useUserContext } from "@/context/userContext";

interface AdminFormValues {
  mobile_no: string;
  nid: string;
  age: string;
  // religion: string;
}

export const AdminUser = () => {
  const { userData ,setUserData, adminUserData, setAdminUserData } = useUserContext();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<AdminFormValues>({
    defaultValues: {
      mobile_no: "",
      nid: "",
      age: "",
      // religion: "",
    },
  });

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

      // if (!res.ok) {
      //   const errorData = await res.json();
      //   throw new Error(errorData.detail || "Error creating Admin User");
      // }

      return res.json();
    },
    onSuccess: async () => {
      const token = window.localStorage.getItem("authToken");
      if (!token) {
        toast.error("Auth token not found");
        return;
      }

      toast.success("Manager created successfully");
      router.push("/");

      const [ adminUserData] = await Promise.all([
        fetchAdminUserData(token),
      ]);


      const adminData = adminUserData.find((d:any) => d.user === userData.id) ?? null;

      setAdminUserData(adminData);


      if (adminUserData?.id) {
        router.push("/");
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
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Create Manager Account</CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="National ID"
                />
                {errors.nid && <span>{errors.nid.message}</span>}
              </div>

              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Age:</Label>
                <Input
                  type="text"
                  {...register("age", { required: "Age is required" })}
                  placeholder="Age"
                />
                {errors.age && <span>{errors.age.message}</span>}
              </div>

              {/* <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Religion:</Label>
                <Input
                  type="text"
                  {...register("religion", { required: "Religion is required" })}
                  placeholder="Religion"
                />
                {errors.religion && <span>{errors.religion.message}</span>}
              </div> */}

              <div className="flex justify-end">
                <Button type="submit" className="w-full" disabled={mutation.isLoading}>
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
