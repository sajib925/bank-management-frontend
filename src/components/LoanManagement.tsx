import { axiosInstance } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
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

// Fetch Loans
const fetchLoans = async () => {
  const response = await axiosInstance.get("/transactions/loans/");
  return response.data;
};

// Approve Loan
const approveLoan = async (loanId: number, amount_approved: number) => {
  const response = await axiosInstance.post(
    `/transactions/loans/${loanId}/approve/`,
    { amount_approved }
  );
  return response.data;
};

// Reject Loan
const rejectLoan = async (loanId: number) => {
  const response = await axiosInstance.post(
    `/transactions/loans/${loanId}/reject/`
  );
  return response.data;
};

// Using React Query
const LoanList = () => {
  const queryClient = useQueryClient();
  const { data: loans, isLoading } = useQuery("loans", fetchLoans);

  const approveLoanMutation = useMutation(
    (data: { loanId: number; amount_approved: number }) =>
      approveLoan(data.loanId, data.amount_approved)
  );

  const rejectLoanMutation = useMutation((loanId: number) =>
    rejectLoan(loanId)
  );

  const handleApprove = (loanId: number) => {
    approveLoanMutation.mutate(
      { loanId, amount_approved: 1000 },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("loans");
        },
      }
    );
  };

  const handleReject = (loanId: number) => {
    rejectLoanMutation.mutate(loanId, {
      onSuccess: () => {
        queryClient.invalidateQueries("loans");
      },
    });
  };
  const token = useAuthToken();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-600 pb-8">
        View and Manage Loan Requests
      </h1>
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
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="pr-12 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customers
              </th>
              <th className="pr-20 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans?.map((l: any) => (
              <tr key={l.id}>
                <td className="px-6 text-left py-4 whitespace-nowrap">Loan</td>
                <td className="px-6 text-center py-4 whitespace-nowrap">
                  {l.amount_requested}
                </td>
                <td className="px-6 text-center py-4 whitespace-nowrap">
                  {l.status}
                </td>
                <td className="px-6 text-center py-4 whitespace-nowrap">
                  {l.request_date}
                </td>
                <td className="px-6 text-right py-4 whitespace-nowrap">
                  <Dialog>
                    <DialogTrigger className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">
                      {l.customer_name}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className='text-2xl lg:text-4xl text-center'>Customer Information</DialogTitle>
                        <div className="p-2">
                          <Image
                              className="w-32 h-32 rounded-full mx-auto"
                              src={l.customer_image ? l.customer_image : ""}
                              alt="user image"
                              width={128}
                              height={128}
                          />
                        </div>
                        <div className="p-2">
                          <h3 className="text-center text-xl lg:text-2xl text-gray-900 font-medium leading-8">
                            {l.customer_name}
                          </h3>
                          <div className="text-center text-gray-400 text-xs font-semibold">
                            <p>{l.customer_account_type}</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <table className="text-base lg:text-lg my-3">
                              <tbody>
                              <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">
                                  Account No
                                </td>
                                <td className="px-2 py-2">{l.customer_account_no}</td>
                              </tr>
                              <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">
                                  Phone
                                </td>
                                <td className="px-2 py-2">{l.customer_mobile_no}</td>
                              </tr>
                              <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">
                                  Email
                                </td>
                                <td className="px-2 py-2">{l.customer_email}</td>
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
                  {l.status === "pending" ? (
                    <>
                      <Button
                        onClick={() => handleApprove(l.id)}
                        className="bg-blue-600"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(l.id)}
                        className="bg-yellow-500"
                      >
                        Reject
                      </Button>
                    </>
                  ) : l.status === "approved" ? (
                    <Button className="bg-green-500" disabled>
                      Approved
                    </Button>
                  ) : (
                    <Button className="bg-red-500" disabled>
                      Rejected
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default LoanList;
