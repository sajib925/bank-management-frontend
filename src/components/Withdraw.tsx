"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Card } from "./ui/card";
import { useUserContext } from "@/context/userContext";
import { Input } from "./ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { axiosInstance } from "@/lib/utils";



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

const withdrawMoney = async (amount: number) => {
  return axiosInstance.post("/transactions/withdrawal/", {
    amount,
  });
};

const withdrawMoneyGet = async () => {
  return axiosInstance.get("/transactions/withdrawal/");
};
const fetchCustomers = async () => {
  const response = await axiosInstance.get("/account/customer/");
  return response.data;
};

const useWithdrawGet = () => useQuery("withdraw", withdrawMoneyGet);
const useCustomers = () => useQuery("customers", fetchCustomers);

const Withdraw: React.FC = () => {
  const {userData, customerData, setCustomerData} = useUserContext()
  const [modalClose, setModalClose] = useState(false);
  const queryClient = useQueryClient();
  const token = useAuthToken();

  const useWithdraw = () =>
    useMutation(withdrawMoney, {
      onSuccess: () => {
        queryClient.invalidateQueries("withdraw");
        refetchCustomers();
        setCustomerData(customers)
        toast.success("Withdrawal successful!");
        setModalClose(false);
      },
    });

  const {
    register: registerWithdraw,
    handleSubmit: handleWithdrawSubmit,
    formState: { errors: withdrawErrors, isSubmitting: isWithdrawing },
  } = useForm<{ amount: number }>();

  const withdrawMutation = useWithdraw();
  const {
    data: withdraw,
    refetch: refetchWithdraw,
    isFetching: isFetchingWithdraw,
  } = useWithdrawGet();


  const {
    data: customers,
    refetch: refetchCustomers,
    isFetching: isFetchingCustomers,
    error: customerError,
  } = useCustomers();
  const handleWithdraw = async (data: { amount: number }) => {
    try {
      await withdrawMutation.mutateAsync(data.amount);
    } catch (error) {
      console.error("Error withdrawing money:", error);
    }
  };
  const cus = customers?.find((c: any) => c.user === userData.id);
  
  return (
    <div>
      <div className="max-w-screen-xl w-full mx-auto">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 pb-6 text-center">
            Your Current Balance is: {cus?.balance} BDT
          </h2>
          <div className="flex items-center justify-between gap-4 flex-wrap pb-4">
            <h2 className="text-2xl text-gray-600 font-bold py-8 text-center">
              Your Withdraw Report
            </h2>
            <Dialog onOpenChange={setModalClose} open={modalClose}>
              <DialogTrigger
                  className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">
                Withdraw Money
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Money</DialogTitle>
                  <form onSubmit={handleWithdrawSubmit(handleWithdraw)}>
                    <Input
                        type="number"
                        {...registerWithdraw("amount", {
                          required: "Amount is required",
                        })}
                        placeholder="Enter amount"
                    />
                    <div className="flex justify-end pt-4">
                      <button
                          type="submit"
                          disabled={isWithdrawing}
                          className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer"
                      >
                        Withdraw
                      </button>
                    </div>
                    {withdrawErrors.amount && (
                        <p>{withdrawErrors.amount.message}</p>
                    )}
                    {withdrawMutation.isSuccess && (
                        <p>Withdrawal successful!</p>
                    )}
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Card className="w-full overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
              <tr>
                <th className="pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Type
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="pr-20 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {withdraw?.data.map((t: any) => (
                  <tr key={t.id}>
                    <td className="px-6 text-left py-4 whitespace-nowrap">
                      Withdraw
                    </td>
                    <td className="px-6 text-center py-4 whitespace-nowrap">
                      {t.amount}
                    </td>
                    <td className="px-6 text-right py-4 whitespace-nowrap flex justify-end gap-2">
                      {t.timestamp}
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
