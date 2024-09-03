"use client";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserContext } from "@/context/userContext";

const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUserData } = useUserContext();

  return useMutation({
    mutationFn: async () => {
      const authToken = window.localStorage.getItem("authToken");

      const response = await fetch("https://bank-management-backend.onrender.com/api/auth/logout/", {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Logout failed");
      }

      return response.json();
    },
    onSuccess: () => {
      // Clear auth token and user data
      window.localStorage.removeItem("authToken");
      queryClient.clear();
      setUserData({
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
      });  
      toast.success("Logout successfully");
      router.push("/signIn");
    },
    onError: (error) => {
      console.error("Logout failed", error);
      toast.error(`Error: ${"Something went wrong"}`);
    },
  });
};

export default useLogout;
