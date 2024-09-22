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
import { Button } from "./ui/button";

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

const requestLoan = async (amount_requested: number) => {
  return axiosInstance.post("/transactions/loans/", {
    amount_requested,
  });
};

const repayLoan = async ({ loanId, amount }: { loanId: number; amount: number }) => {
  return axiosInstance.post(`/transactions/loans/${loanId}/repay/`, {
    amount,
  });
};

const fetchLoans = async () => {
  return axiosInstance.get("/transactions/loans/");
};

const useLoans = () => useQuery("loans", fetchLoans);

const Loan: React.FC = () => {
  const [modalClose, setModalClose] = useState(false);
  const [modalClosePay, setModalClosePay] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { userData, setCustomerData } = useUserContext();
  const token = useAuthToken();

  const useLoanRequest = () => useMutation(requestLoan, {
    onSuccess: () => {
      toast.success("Loan request successful!");
      setModalClose(false);
      queryClient.invalidateQueries("loans");
    },
  });

  const useLoanRepay = () => useMutation(repayLoan, {
    onSuccess: () => {
      toast.success("Loan repaid successfully!");
      queryClient.invalidateQueries("loans");
      setSelectedLoan(null); 
      setModalClosePay(false);
    },
  });

  const {
    register: registerLoan,
    handleSubmit: handleLoanSubmit,
    formState: { errors: loanErrors, isSubmitting: isRequestingLoan },
  } = useForm<{ amount_requested: number }>();

  const {
    register: registerRepay,
    handleSubmit: handleRepaySubmit,
    formState: { errors: repayErrors, isSubmitting: isRepayingLoan },
  } = useForm<{ amount: number }>();

  const loanRequestMutation = useLoanRequest();
  const loanRepayMutation = useLoanRepay();

  const {
    data: loans,
    refetch: refetchLoans,
    isFetching: isFetchingLoans,
  } = useLoans();

  const handleLoanRequest = async (data: { amount_requested: number }) => {
    try {
      await loanRequestMutation.mutateAsync(data.amount_requested);
      refetchLoans();
    } catch (error) {
      console.error("Error requesting loan:", error);
    }
  };

  const handleLoanRepay = async (data: { amount: number }) => {
    if (selectedLoan !== null) {
      try {
        await loanRepayMutation.mutateAsync({ loanId: selectedLoan, amount: data.amount });
        setSelectedLoan(null);
      } catch (error) {
        console.error("Error repaying loan:", error);
      }
    }
  };
console.log(loans);

  return (
    <div>
      <div className="max-w-screen-xl w-full mx-auto">
        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap pb-4">
            <h2 className="text-2xl text-gray-600 font-bold py-8 text-center">
              Your Loan Report
            </h2>
            <Dialog onOpenChange={setModalClose} open={modalClose}>
              <DialogTrigger className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">
                Request Loan
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Loan</DialogTitle>
                  <form onSubmit={handleLoanSubmit(handleLoanRequest)}>
                    <Input
                      type="number"
                      {...registerLoan("amount_requested", {
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
                    {loanErrors.amount_requested && <p>{loanErrors.amount_requested.message}</p>}
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
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="pr-20 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans?.data.map((t: any) => (
                  <tr key={t.id}>
                    <td className="px-6 text-left py-4 whitespace-nowrap">
                      Loan
                    </td>
                    <td className="px-6 text-center py-4 whitespace-nowrap">
                      {t.amount_requested}
                    </td>
                    <td className="px-6 text-center py-4 whitespace-nowrap">
                      {t.status}
                    </td>
                    <td className="px-6 text-right py-4 whitespace-nowrap">
                      {t.request_date}
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

export default Loan;

