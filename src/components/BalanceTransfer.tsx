"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { axiosInstance } from "@/lib/utils";
import { useUserContext } from "@/context/userContext";

interface Account {
  id: number;
  user: number;
  balance: string;
  mobile_no: string;
  nid: string;
  age: string;
  monthly_income: string;
  account_no: string;
}

interface Transaction {
  id: number;
  recipient_account_no: string;
  amount: string;
  timestamp: string;
  sender: number;
}

interface BalanceTransferData {
  data: Transaction[];
}

interface Customer {
  id: number;
  // Define other customer fields if needed
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

const balanceTransfer = async (data: { amount: number; recipient_account_no: string }) => {
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


const BalanceTransfer: React.FC = () => {
  const {userData} = useUserContext()
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();
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
    formState: { errors, isSubmitting },
  } = useForm<{ amount: number; recipient_account_no: string }>();

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

  const handleBalanceTransfer = async (data: { amount: number; recipient_account_no: string }) => {
    try {
      await balanceTransferMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error during balance transfer:", error);
    }
  };
  


  const getMatchingTransaction = () => {
    return customers?.find((transaction:Transaction) =>
      balanceTransferData?.data.some((account : Account) => account.account_no === transaction.recipient_account_no)
    );
  };

  const matchingTransaction = getMatchingTransaction();

  console.log(balanceTransferData);

  return (
      <div className="max-w-screen-xl w-full mx-auto">
        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap pb-4">
          <h2 className="text-2xl text-gray-600 font-bold py-8 text-center">
            Your Balance Transfer Report
          </h2>
            <Dialog onOpenChange={setModalOpen} open={modalOpen}>
              <DialogTrigger className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">
                Balance Transfer
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Balance Transfer</DialogTitle>
                  <form onSubmit={handleSubmit(handleBalanceTransfer)} className="flex flex-col gap-4">
                    <Input
                      type="text"
                      {...register("recipient_account_no", {
                        required: "Recipient Account Number is required",
                      })}
                      placeholder="Enter recipient account number"
                    />
                    {errors.recipient_account_no && <p>{errors.recipient_account_no.message}</p>}
                    <Input
                      type="number"
                      {...register("amount", {
                        required: "Amount is required",
                      })}
                      placeholder="Enter amount"
                    />
                    {errors.amount && <p>{errors.amount.message}</p>}
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer"
                      >
                        Balance Transfer
                      </button>
                    </div>
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
                    Sender Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reciver Name
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
                {balanceTransferData?.data.map((t: any) => (
                  <tr key={t.id}>
                    <td className="px-6 text-left py-4 whitespace-nowrap">
                     Balance Transfer
                    </td>
                    <td className="px-6 text-center py-4 whitespace-nowrap">
                      {t.sender_name}
                    </td>
                    <td className="px-6 text-center py-4 whitespace-nowrap">
                      {t.recipient_name}
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
  );
};

export default BalanceTransfer;
