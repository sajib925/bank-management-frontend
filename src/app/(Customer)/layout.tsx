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

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React, { useEffect } from "react"
import { useUserContext } from "@/context/userContext"
import { usePathname } from "next/navigation"
import Image from "next/image"
import useLogout from "@/components/SignOut"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathName = usePathname()
  

  const { userData, managerData, customerData, setUserData, setCustomerData, setManagerData } = useUserContext();

  const customer = Array.isArray(customerData) ? customerData.find((c) => c.user === userData.id) : null;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await fetch("https://bank-management-backend.onrender.com/api/auth/update-profile/", {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await response.json();
          setUserData(userData);
        } catch (error) {
        }
      }
    };

    const fetchManagerData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await fetch("https://bank-management-backend.onrender.com/api/account/manager", {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          const managerData = await response.json();
          setManagerData(managerData);
        } catch (error) {
        }
      }
    };
    const fetchCustomerData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await fetch("https://bank-management-backend.onrender.com/api/account/customer", {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          const customerData = await response.json();
          setCustomerData(customerData);
        } catch (error) {
        }
      }
    };

    fetchUserData();
    fetchCustomerData()
    fetchManagerData()
  }, [setUserData, setCustomerData, setManagerData]);
  
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/customerDashboard" className="flex items-center gap-2 font-semibold">
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
                href="/customerDashboard"
                className={`${pathName == "/customerDashboard" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/transaction"
                className={`${pathName == "/transaction" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <ShoppingCart className="h-4 w-4" />
                Transactions
              </Link>
              <Link
                href="/account"
                className={`${pathName == "/account" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Package className="h-4 w-4" />
                Accounts
              </Link>
              <Link
                href="/settings"
                className={`${pathName == "/settings" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Users className="h-4 w-4" />
                Settings
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
                href="/customerDashboard"
                className={`${pathName == "/customerDashboard" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/transaction"
                className={`${pathName == "/transaction" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <ShoppingCart className="h-4 w-4" />
                Transactions
              </Link>
              <Link
                href="/account"
                className={`${pathName == "/account" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Package className="h-4 w-4" />
                Accounts
              </Link>
              <Link
                href="/settings"
                className={`${pathName == "/settings" && "bg-muted"} flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:bg-muted`}
              >
                <Users className="h-4 w-4" />
                Settings
              </Link>
            </nav>
              
            </SheetContent>
          </Sheet>
          <div className="flex justify-end w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {
                  customerData && customer ? (
                      <Image
                          className="w-8 h-8 object-cover rounded-full"
                          src={customer?.image || "/image/profi.png"}
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
