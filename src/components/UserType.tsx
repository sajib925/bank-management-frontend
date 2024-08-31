import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { AdminUser } from "./AdminAccount";
import { NormalUser } from "./UserAccount";

export const UserType = () => {
  return (
    <div className="max-w-screen-xl h-screen w-full mx-auto my-10 lg:my-20 px-5">
      <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-6">
        <Image src={"/image/users.jpg"} width={600} height={500} alt="login" />
    <div className="">
      <h1 className="text-2xl font-semibold pb-3">What type of account do you need?</h1>
      <Tabs defaultValue="patient" className="w-full">
        <TabsList className="flex items-center justify-center">
          <TabsTrigger value="patient">User</TabsTrigger>
          <TabsTrigger value="doctor">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="patient">
          <NormalUser />
        </TabsContent>
        <TabsContent value="doctor">
          <AdminUser />
        </TabsContent>
        <Button className="w-full my-6" asChild>
          <Link href={"/"} className="w-full">Skip</Link>
        </Button>
      </Tabs>
    </div>
    </div>
    </div>
  );
};