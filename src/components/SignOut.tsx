"use client"
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const authToken = window.localStorage.getItem("authToken");

      const response = await fetch(
        "https://bank-management-backend.onrender.com/api/auth/logout/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Logout failed");
      }

      return response.json();
    },
    onSuccess: () => {
      window.localStorage.removeItem("authToken");
      queryClient.clear(); 
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
