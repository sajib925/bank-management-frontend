"use client";
import { axiosInstance } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Card } from "./ui/card";
import Link from "next/link";

interface Transaction {
  id: number;
  amount: string;
  timestamp: string;
  customer: number;
  type: string;
  status: string;
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

const depositMoneyGet = async () => {
  return axiosInstance.get("/transactions/deposit/");
};

const fetchLoans = async () => {
  return axiosInstance.get("/transactions/loans/");
};

const withdrawMoneyGet = async () => {
  return axiosInstance.get("/transactions/withdrawal/");
};

const useDepositGet = () => useQuery("deposits", depositMoneyGet);
const useLoans = () => useQuery("loans", fetchLoans);
const useWithdrawGet = () => useQuery("withdraw", withdrawMoneyGet);

export const RecentTransactions = () => {
  const token = useAuthToken();
  const { data: depositsData } = useDepositGet();
  const { data: loansData } = useLoans();
  const { data: withdrawData } = useWithdrawGet();

  const deposits: Transaction[] =
    depositsData?.data.map((deposit: Transaction) => ({
      ...deposit,
      type: "Deposit",
    })) || [];
  const withdrawals: Transaction[] =
    withdrawData?.data.map((withdrawal: Transaction) => ({
      ...withdrawal,
      type: "Withdrawal",
    })) || [];
  const loans: Transaction[] =
    loansData?.data.map((loan: Transaction) => ({ ...loan, type: "Loan" })) ||
    [];

  const latestDeposit: Transaction | undefined = deposits.reduce(
    (latest, current) => {
      return new Date(current.timestamp) > new Date(latest.timestamp)
        ? current
        : latest;
    },
    deposits[0]
  );

  const latestWithdrawal: Transaction | undefined = withdrawals.reduce(
    (latest, current) => {
      return new Date(current.timestamp) > new Date(latest.timestamp)
        ? current
        : latest;
    },
    withdrawals[0]
  );

  const latestLoan: Transaction | undefined = loans.reduce(
    (latest, current) => {
      return new Date(current.timestamp) > new Date(latest.timestamp)
        ? current
        : latest;
    },
    loans[0]
  );

  const recentTransactions: Transaction[] = [
    latestDeposit,
    latestWithdrawal,
    latestLoan,
  ].filter(Boolean);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Latest Transactions
        </h2>
        <Link href={"/transaction"} className="primaryBTN">
          See All
        </Link>
      </div>

      <Card className="w-full overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-700">
              <th className="pl-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                Amount
              </th>
              <th className="pr-8 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((t, index) => (
                <tr key={index}>
                  <td className="px-6 text-left py-4 whitespace-nowrap">
                    {t.type}
                  </td>
                  <td className={`${t.amount ? " text-gray-900" : "text-red-600"} mx-4 px-2 text-center my-3 py-1 rounded whitespace-nowrap`}>
                    {t.amount ? t.amount : "Not Appove Yet"}
                  </td>
                  <td className="text-white mx-4 my-3 text-right whitespace-nowrap flex justify-end gap-2">
                    <span className={`${t.status == "rejected" ? "bg-red-600" : t.status == "pending" ? "bg-yellow-600" : " bg-blue-600"} text-white px-2 py-1 rounded-full text-right whitespace-nowrap`}>
                    {t.status ? t.status : "Success"}
                    </span>
                   
                  </td>
                </tr>
              ))
            ) : (
              <p>No transactions found.</p>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
