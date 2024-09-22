"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Loan from "./Loan";
import BalanceTransfer from "./BalanceTransfer";
import { useUserContext } from "@/context/userContext";

export const Transactions = () => {
  const { customerData, userData } = useUserContext();
  const cus = customerData?.find((c: any) => c.user === userData.id);
  return (
    <div>
      <Tabs defaultValue="Deposit" className="w-full">

        <TabsList className="flex items-center justify-center max-w-[400px] overflow-auto">
          <TabsTrigger value="Deposit">Deposit</TabsTrigger>
          <TabsTrigger value="Withdrawal">Withdrawal</TabsTrigger>
          <TabsTrigger value="Loan">Loan</TabsTrigger>
          <TabsTrigger value="transfer">Balance Transfer</TabsTrigger>
        </TabsList>
        <TabsContent value="Deposit">
          <Deposit />
        </TabsContent>
        <TabsContent value="Withdrawal">
          <Withdraw />
        </TabsContent>
        <TabsContent value="Loan">
          <Loan />
        </TabsContent>
        <TabsContent value="transfer">
          <BalanceTransfer />
        </TabsContent>
      </Tabs>
    </div>
  );
};
