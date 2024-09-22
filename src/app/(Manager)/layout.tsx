"use client"
import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  LogOut
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {usePathname, useRouter} from "next/navigation"
import Image from "next/image"
import useLogout from "@/components/SignOut"
import {useUserContext} from "@/context/userContext";
import React from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {userData, managerData, customerData} = useUserContext()
  const manager = managerData.find((m) => m.user === userData.id)

  const pathName = usePathname()
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/managerDashboard" className="flex items-center gap-2 font-semibold">
              Online Banking
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/managerDashboard"
                className={`${pathName == "/managerDashboard" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Home className="h-4 w-4" />
                Loan List
              </Link>
              <Link
                href="/deposit"
                className={`${pathName == "/depsit" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <ShoppingCart className="h-4 w-4" />
                Deposit List
              </Link>
              <Link
                href="/withdraw"
                className={`${pathName == "/withdraw" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Package className="h-4 w-4" />
                Withdraw List
              </Link>
              <Link
                href="/balanceTransfer"
                className={`${pathName == "/balanceTransfer" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Users className="h-4 w-4" />
                Balance Transfer List
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/managerDashboard"
                className={`${pathName == "/managerDashboard" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Home className="h-4 w-4" />
                Loan List
              </Link>
              <Link
                href="/deposit"
                className={`${pathName == "/depsit" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <ShoppingCart className="h-4 w-4" />
                Deposit List
              </Link>
              <Link
                href="/withdraw"
                className={`${pathName == "/withdraw" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Package className="h-4 w-4" />
                Withdraw List
              </Link>
              <Link
                href="/balanceTransfer"
                className={`${pathName == "/balanceTransfer" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Users className="h-4 w-4" />
                Balance Transfer List
              </Link>
            </nav>
            </SheetContent>
          </Sheet>
          <div className="flex justify-end w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {
                  managerData && manager ? (
                      <Image
                          className="w-8 h-8 rounded-full"
                          src={manager?.image || "/image/profi.png"}
                          alt="user photo"
                          width={25}
                          height={25}
                      />
                  ) : (
                      <Image
                          className="w-8 h-8 rounded-full"
                          src="/image/profi.png"
                          alt="user photo"
                          width={25}
                          height={25}
                      />
                  )
                }
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem className="flex items-center gap-2 justify-center cursor-pointer"  onClick={handleLogout}>
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        { children }
          
        </main>
      </div>
    </div>
  ) ;
}
