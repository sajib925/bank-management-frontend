"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Card } from "./ui/card";
import { useUserContext } from "@/context/userContext";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";

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

const depositMoney = async (amount: number) => {
  return axiosInstance.post("/transactions/deposit/", {
    amount,
    transaction_type: 1,
  });
};

const withdrawMoney = async (amount: number) => {
  return axiosInstance.post("/transactions/withdraw/", {
    amount,
    transaction_type: 2,
  });
};

const requestLoan = async (amount: number) => {
  return axiosInstance.post("/transactions/loan/request/", {
    amount,
    transaction_type: 3,
  });
};

const fetchTransactions = async () => {
  return axiosInstance.get("/transactions/report/");
};

const fetchLoans = async () => {
  return axiosInstance.get("/transactions/loan/list/");
};

const payLoan = async (loanId: number) => {
  return axiosInstance.post(`/transactions/loan/pay/${loanId}/`);
};

const fetchCustomers = async () => {
  const response = await axiosInstance.get("/account/customer/");
  return response.data;
};

// const useDeposit = () => useMutation(depositMoney);
const useDeposit = () => useMutation(depositMoney, {
  onSuccess: () => {
    toast.success("Deposit successful!")
  },
});
// const useWithdraw = () => useMutation(withdrawMoney);
const useWithdraw = () => useMutation(withdrawMoney, {
  onSuccess: () => {
    toast.success("Withdrawal successful!")
  },
});
// const useLoanRequest = () => useMutation(requestLoan);
const useLoanRequest = () => useMutation(requestLoan, {
  onSuccess: () => {
    toast.success("Loan request successful!")
  },
});
const useTransactions = () => useQuery("transactions", fetchTransactions);
const useLoans = () => useQuery("loans", fetchLoans);
// const usePayLoan = () => useMutation(payLoan);
const usePayLoan = () => useMutation(payLoan, {
  onSuccess: () => {
    toast.success("Loan payment successful!");
  },
});

const useCustomers = () => useQuery("customers", fetchCustomers);

const CustomerDashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const { userData } = useUserContext();
  const token = useAuthToken();

  const {
    register: registerDeposit,
    handleSubmit: handleDepositSubmit,
    formState: { errors: depositErrors, isSubmitting: isDepositing },
  } = useForm<{ amount: number }>();

  const {
    register: registerWithdraw,
    handleSubmit: handleWithdrawSubmit,
    formState: { errors: withdrawErrors, isSubmitting: isWithdrawing },
  } = useForm<{ amount: number }>();

  const {
    register: registerLoan,
    handleSubmit: handleLoanSubmit,
    formState: { errors: loanErrors, isSubmitting: isRequestingLoan },
  } = useForm<{ amount: number }>();

  const depositMutation = useDeposit();
  const withdrawMutation = useWithdraw();
  const loanRequestMutation = useLoanRequest();
  const {
    data: transactions,
    refetch: refetchTransactions,
    isFetching: isFetchingTransactions,
  } = useTransactions();
  const {
    data: loans,
    refetch: refetchLoans,
    isFetching: isFetchingLoans,
  } = useLoans();
  const payLoanMutation = usePayLoan();

  const {
    data: customers,
    isFetching: isFetchingCustomers,
    error: customerError,
  } = useCustomers();

  const handleDeposit = async (data: { amount: number }) => {
    try {
      await depositMutation.mutateAsync(data.amount);
      refetchTransactions();
    } catch (error) {
      console.error("Error depositing money:", error);
    }
  };

  const handleWithdraw = async (data: { amount: number }) => {
    try {
      await withdrawMutation.mutateAsync(data.amount);
      refetchTransactions();
    } catch (error) {
      console.error("Error withdrawing money:", error);
    }
  };

  const handleLoanRequest = async (data: { amount: number }) => {
    try {
      await loanRequestMutation.mutateAsync(data.amount);
      refetchLoans();
    } catch (error) {
      console.error("Error requesting loan:", error);
    }
  };

  const handlePayLoan = async (loanId: number) => {
    try {
      await payLoanMutation.mutateAsync(loanId);
      refetchLoans();
    } catch (error) {
      console.error("Error paying loan:", error);
    }
  };

  const cus = customers?.filter((c: any) => c.user === userData.id);

  return (
    <div>
      <div className="max-w-screen-xl w-full mx-auto">
        <div>
          <h2 className="text-2xl font-bold py-8 text-center">
            Your Transaction Report
          </h2>
          {cus && cus.length > 0 ? (
            cus.map((m: any) => (
              <h2
                key={m.id}
                className="text-xl font-semibold pb-5 text-gray-600"
              >
                Your Current Balance is: {m.balance}
              </h2>
            ))
          ) : (
            <h2 className="text-xl font-semibold pb-5 text-gray-600">
              Your Current Balance is: 0.00
            </h2>
          )}
          <Card className="w-full overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="pl-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                {transactions?.data.map((t: any) => (
                  <tr key={t.id}>
                    <td className="px-6 text-left py-4 whitespace-nowrap">
                      {t.transaction_type === 1 && "Deposit"}
                      {t.transaction_type === 2 && "Withdrawal"}
                      {t.transaction_type === 3 && "Loan"}
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

        <Tabs defaultValue="Deposit" className="w-full mt-10">
          <h2 className="text-xl font-semibold pb-5 text-gray-900">
            What type of transaction you need?
          </h2>
          <TabsList className="flex items-center justify-center">
            <TabsTrigger value="Deposit">Deposit</TabsTrigger>
            <TabsTrigger value="Withdrawal">Withdrawal</TabsTrigger>
            <TabsTrigger value="Loan">Loan Request</TabsTrigger>
          </TabsList>
          <TabsContent value="Deposit">
            <div>
              <h2 className="text-lg font-semibold pb-4">Deposit Money</h2>
              <form onSubmit={handleDepositSubmit(handleDeposit)}>
                <Input
                  type="number"
                  {...registerDeposit("amount", {
                    required: "Amount is required",
                  })}
                  placeholder="Enter amount"
                />
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isDepositing}
                    className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer"
                  >
                    Deposit
                  </button>
                </div>
                {depositErrors.amount && <p>{depositErrors.amount.message}</p>}
                {depositMutation.isSuccess && <p>Deposit successful!</p>}
              </form>
            </div>
          </TabsContent>
          <TabsContent value="Withdrawal">
            <div>
              <h2 className="text-lg font-semibold pb-4">Withdraw Money</h2>
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
                {withdrawErrors.amount && <p>{withdrawErrors.amount.message}</p>}
                {withdrawMutation.isSuccess && <p>Withdrawal successful!</p>}
              </form>
            </div>
          </TabsContent>
          <TabsContent value="Loan">
            <div>
              <h2 className="text-lg font-semibold pb-4">Request Loan</h2>
              <form onSubmit={handleLoanSubmit(handleLoanRequest)}>
                <Input
                  type="number"
                  {...registerLoan("amount", {
                    required: "Amount is required",
                  })}
                  placeholder="Enter amount"
                />
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isRequestingLoan}
                    className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer"
                  >
                    Request Loan
                  </button>
                </div>
                {loanErrors.amount && <p>{loanErrors.amount.message}</p>}
                {loanRequestMutation.isSuccess && <p>Loan request successful!</p>}
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
