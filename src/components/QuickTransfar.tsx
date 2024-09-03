"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Card } from "./ui/card";
import { useUserContext } from "@/context/userContext";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const API_URL = "https://bank-management-backend.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      axiosInstance.defaults.headers.Authorization = `Token ${storedToken}`;
    }
  }, []);

  return token;
};

const balanceTransfer = async (data: { amount: number; recipient_id: string }) => {
  return axiosInstance.post("/transactions/balance-transfer/", data);
};

const balanceTransferGet = async () => {
  return axiosInstance.get("/transactions/balance-transfer/");
};

const fetchCustomers = async () => {
  const response = await axiosInstance.get("/account/customer/");
  return response.data;
};

const useBalanceTransferGet = () => useQuery("balanceTransfer", balanceTransferGet);
const useCustomers = () => useQuery("customers", fetchCustomers);

const QuickBalanceTransfer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { userData } = useUserContext();
  const token = useAuthToken();

  const balanceTransferMutation = useMutation(balanceTransfer, {
    onSuccess: () => {
      toast.success("Balance Transfer Successful!");
      queryClient.invalidateQueries("balanceTransfer");
      setModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error}`);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ amount: number; recipient_id: string; recipient_name?: string }>();

  const {
    data: balanceTransferData,
    refetch: refetchBalanceTransfer,
    isFetching: isFetchingBalanceTransfer,
  } = useBalanceTransferGet();

  const {
    data: customers,
    isFetching: isFetchingCustomers,
    error: customerError,
  } = useCustomers();

  const handleBalanceTransfer = async (data: { amount: number; recipient_id: string }) => {
    try {
      await balanceTransferMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error during balance transfer:", error);
    }
  };

  const handleQuickTransfer = (recipient_id: string, recipient_name: string) => {
    setValue("recipient_id", recipient_id);
    setValue("recipient_name", recipient_name); 
    setModalOpen(true);
  };

  const customer = customers?.find((c: any) => c.user === userData.id);

  return (
    <div>
      <div className="max-w-screen-xl w-full mx-auto">
        <div>
          <h2 className="text-2xl font-bold py-8">
            Quick Transfar
          </h2>
          <div className="flex items-center justify-between gap-4 flex-wrap pb-5 lg:pb-10">
            {customer ? (
              <h2 className="text-xl font-semibold text-gray-600">
                Your Current Balance is: {customer.balance}
              </h2>
            ) : (
              <h2 className="text-xl font-semibold pb-5 text-gray-600">
                Your Current Balance is: 0.00
              </h2>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBalanceTransfer;
