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
import Image from "next/image";



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


const useWithdrawGet = () => useQuery("withdraw", withdrawMoneyGet);

const WithdrawManagement: React.FC = () => {
  const [modalClose, setModalClose] = useState(false);
  const queryClient = useQueryClient();
  const { userData } = useUserContext();
  const token = useAuthToken();

  const useWithdraw = () =>
    useMutation(withdrawMoney, {
      onSuccess: () => {
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



  const handleWithdraw = async (data: { amount: number }) => {
    try {
      await withdrawMutation.mutateAsync(data.amount);
    } catch (error) {
      console.error("Error withdrawing money:", error);
    }
  };

  
  return (
    <div>
      <div className="max-w-screen-xl w-full mx-auto">
        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap pb-4">
          <h2 className="text-2xl text-gray-600 font-bold py-8 text-center">
            All Withdraw Report
          </h2>
            {/*<Dialog onOpenChange={setModalClose} open={modalClose}>*/}
            {/*  <DialogTrigger className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">*/}
            {/*    Withdraw Money*/}
            {/*  </DialogTrigger>*/}
            {/*  <DialogContent>*/}
            {/*    <DialogHeader>*/}
            {/*      <DialogTitle>Withdraw Money</DialogTitle>*/}
            {/*      <form onSubmit={handleWithdrawSubmit(handleWithdraw)}>*/}
            {/*        <Input*/}
            {/*          type="number"*/}
            {/*          {...registerWithdraw("amount", {*/}
            {/*            required: "Amount is required",*/}
            {/*          })}*/}
            {/*          placeholder="Enter amount"*/}
            {/*        />*/}
            {/*        <div className="flex justify-end pt-4">*/}
            {/*          <button*/}
            {/*            type="submit"*/}
            {/*            disabled={isWithdrawing}*/}
            {/*            className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer"*/}
            {/*          >*/}
            {/*            Withdraw*/}
            {/*          </button>*/}
            {/*        </div>*/}
            {/*        {withdrawErrors.amount && (*/}
            {/*          <p>{withdrawErrors.amount.message}</p>*/}
            {/*        )}*/}
            {/*        {withdrawMutation.isSuccess && (*/}
            {/*          <p>Withdrawal successful!</p>*/}
            {/*        )}*/}
            {/*      </form>*/}
            {/*    </DialogHeader>*/}
            {/*  </DialogContent>*/}
            {/*</Dialog>*/}
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
                  <th className="pr-12 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customers
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
                    <td className="px-6 text-right py-4 whitespace-nowrap">
                      <Dialog>
                        <DialogTrigger className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">
                          {t.customer_name}
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className='text-2xl lg:text-4xl text-center'>Customer Information</DialogTitle>
                            <div className="p-2">
                              <Image
                                  className="w-32 h-32 rounded-full mx-auto"
                                  src={t.customer_image ? t.customer_image : ""}
                                  alt="user image"
                                  width={128}
                                  height={128}
                              />
                            </div>
                            <div className="p-2">
                              <h3 className="text-center text-xl lg:text-2xl text-gray-900 font-medium leading-8">
                                {t.customer_name}
                              </h3>
                              <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>{t.customer_account_type}</p>
                              </div>
                              <div className="flex items-center justify-center">
                                <table className="text-base lg:text-lg my-3">
                                  <tbody>
                                  <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                      Account No
                                    </td>
                                    <td className="px-2 py-2">{t.customer_account_no}</td>
                                  </tr>
                                  <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                      Phone
                                    </td>
                                    <td className="px-2 py-2">{t.customer_mobile_no}</td>
                                  </tr>
                                  <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                      Email
                                    </td>
                                    <td className="px-2 py-2">{t.customer_email}</td>
                                  </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
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

export default WithdrawManagement;
