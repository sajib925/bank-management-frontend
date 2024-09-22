"use client";
import React, { useState, useEffect } from "react";
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

interface Deposit {
  id: number;
  amount: number;
  timestamp: string;
}

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

const depositMoney = async (amount: number) => {
  return axiosInstance.post("/transactions/deposit/", {
    amount,
  });
};

const depositMoneyGet = async () => {
  return axiosInstance.get("/transactions/deposit/");
};

const fetchCustomers = async () => {
  const response = await axiosInstance.get("/account/customer/");
  return response.data;
};

const useDepositGet = () => useQuery("deposit", depositMoneyGet);
const useCustomers = () => useQuery("customers", fetchCustomers);

const DepositManagemnet: React.FC = () => {
  const [modalClose, setModalClose] = useState(false);
  const queryClient = useQueryClient();
  const { userData } = useUserContext();
  const token = useAuthToken();

  const useDeposit = () =>
    useMutation(depositMoney, {
      onSuccess: () => {
        refetchDeposit;
        toast.success("Deposit successful!");
        setModalClose(false);
      },
    });

  const {
    register: registerDeposit,
    handleSubmit: handleDepositSubmit,
    formState: { errors: depositErrors, isSubmitting: isDepositing },
  } = useForm<{ amount: number }>();

  const depositMutation = useDeposit();
  const {
    data: deposit,
    refetch: refetchDeposit,
    isFetching: isFetchingDeposit,
  } = useDepositGet();

  const {
    data: customers,
    isFetching: isFetchingCustomers,
    error: customerError,
  } = useCustomers();

  const handleDeposit = async (data: { amount: number }) => {
    try {
      await depositMutation.mutateAsync(data.amount);
    } catch (error) {
      console.error("Error depositing money:", error);
    }
  };

  const cus = customers?.filter((c: any) => c.user === userData.id);
  console.log(deposit?.data);

  return (
    <div>
      <div className="max-w-screen-xl w-full mx-auto">
        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap pb-4">
            <h2 className="text-2xl text-gray-600 font-bold py-8 text-center">
              All Deposit Report
            </h2>
            {/*<Dialog onOpenChange={setModalClose} open={modalClose}>*/}
            {/*  <DialogTrigger className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">*/}
            {/*    Deposit Money*/}
            {/*  </DialogTrigger>*/}
            {/*  <DialogContent>*/}
            {/*    <DialogHeader>*/}
            {/*      <DialogTitle>Deposit Money</DialogTitle>*/}
            {/*      <form onSubmit={handleDepositSubmit(handleDeposit)}>*/}
            {/*        <Input*/}
            {/*          type="number"*/}
            {/*          {...registerDeposit("amount", {*/}
            {/*            required: "Amount is required",*/}
            {/*          })}*/}
            {/*          placeholder="Enter amount"*/}
            {/*        />*/}
            {/*        <div className="flex justify-end pt-4">*/}
            {/*          <button*/}
            {/*            type="submit"*/}
            {/*            disabled={isDepositing}*/}
            {/*            className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer"*/}
            {/*          >*/}
            {/*            Deposit*/}
            {/*          </button>*/}
            {/*        </div>*/}
            {/*        {depositErrors.amount && (*/}
            {/*          <p>{depositErrors.amount.message}</p>*/}
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
                {deposit?.data.map((t: any) => (
                  <tr key={t.id}>
                    <td className="px-6 text-left py-4 whitespace-nowrap">
                      Deposit
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

export default DepositManagemnet;
