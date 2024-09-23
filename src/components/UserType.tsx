import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { AdminUser } from "./AdminAccount";
import { NormalUser } from "./UserAccount";

export const UserType = () => {
  return (
    <div className="max-w-screen-xl  w-full mx-auto my-10 lg:my-20 px-5">
      <div className="">


      <Tabs defaultValue="customer" className="grid items-start lg:justify-between grid-cols-1 lg:grid-cols-2 gap-6">
        <div className='flex flex-col-reverse lg:flex-col'>
          <div className=''>
          <h1 className="text-2xl font-semibold pb-3">What type of account do you want?</h1>
          <div className="flex">
            <TabsList className="">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="manager">Manager</TabsTrigger>
            </TabsList>
            <Button className="w-auto lg:w-1/4 px-10 ml-3" asChild variant={"outline"}>
              <Link href={"/"} className="w-full">Skip</Link>
            </Button>
          </div>
          <Image src={"/image/userType.png"} width={600} height={500} alt="login"/>
        </div>
        </div>
        <TabsContent value="customer">
          <NormalUser/>
        </TabsContent>
        <TabsContent value="manager">
          <AdminUser />
        </TabsContent>
      </Tabs>

    </div>
    </div>
  );
};
