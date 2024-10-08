"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useLogout from "./SignOut";
import { useUserContext } from "@/context/userContext";

interface NavLink {
  href: string;
  label: string;
  current?: boolean;
}

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", current: true },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const navSubLinks: NavLink[] = [
  { href: "/profile", label: "Profile", current: true },
];



const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { userData, managerData, customerData, setUserData, setCustomerData, setManagerData } = useUserContext();

  const manager = Array.isArray(managerData) ? managerData.find((m) => m.user === userData.id) : null;
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const isCustomer = Array.isArray(customerData) && customerData.some((c: any) => c.user === userData.id);
  const isManager = Array.isArray(managerData) && managerData.some((m: any) => m.user === userData.id);

  return (
    <nav
      className={`bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-2 shadow-lg" 
          : " shadow-none" 
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Bank
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          {userData?.id ? (
            <>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >

                {
                  managerData && manager ? (
                      <Image
                          className="w-8 h-8 rounded-full"
                          src={manager?.image || "/image/profi.png"}
                          alt="user photo"
                          width={25}
                          height={25}
                      />
                  ) : customerData && customer ? (
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
                          src="/image/profi.png" // Default image
                          alt="user photo"
                          width={25}
                          height={25}
                      />
                  )
                }


              </button>
              {isDropdownOpen && (
                <div
                  className="absolute top-[55%] left-[50%] -translate-x-[50%] z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    {navSubLinks.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href={isManager? "/managerDashboard" : isCustomer ? "/customerDashboard": "/userType"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                        Dashboard
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                        Logout
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                href={"/signIn"}
                className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer lg:mr-2"
              >
                Sign In
              </Link>
              <Link
                href={"/signUp"}
                className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer"
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isNavOpen}
            onClick={toggleNav}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isNavOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`block py-2 px-3 rounded ${
                    link.current
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }`}
                  aria-current={link.current ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
