"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";
import { useQuery } from "react-query";
import axios from "axios";
import ManagerDashboard from "./ManagerDasboard";
import CustomerDashboard from "./CustomerDashboard";
import Link from "next/link";

const API_URL = "https://bank-management-backend.onrender.com/api";

// Define types for Customer and Manager
interface User {
  id: number;
}

interface Customer {
  user: number; // Assuming this is a user ID
  // Add other customer properties if necessary
}

interface Manager {
  user: number; // Assuming this is a user ID
  // Add other manager properties if necessary
}

// Create axios instance without the token initially
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await axiosInstance.get("/account/customer/");
  return response.data;
};

const fetchManagers = async (): Promise<Manager[]> => {
  const response = await axiosInstance.get("/account/manager/");
  return response.data;
};

const useCustomers = (isClient: boolean) =>
  useQuery("customers", fetchCustomers, { enabled: isClient });

const useManagers = (isClient: boolean) =>
  useQuery("managers", fetchManagers, { enabled: isClient });

const Dashboard: React.FC = () => {
  const { userData } = useUserContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("authToken");
    if (token) {
      axiosInstance.defaults.headers.Authorization = `Token ${token}`;
    }
  }, []);

  const {
    data: customers,
    error: customerError,
  } = useCustomers(isClient);

  const {
    data: managers,
    error: managerError,
  } = useManagers(isClient);

  const isCustomer = customers?.some((c: Customer) => c.user === userData.id);
  const isManager = managers?.some((m: Manager) => m.user === userData.id);

  return (
    <div>
      {isCustomer && <CustomerDashboard />}
      {isManager && <ManagerDashboard />}
      {!isCustomer && !isManager && (
        <div className="flex items-center justify-center flex-col">
          <div className="text-2xl font-bold pb-4">No dashboard available</div>
          <Link
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
            href="/userType"
          >
            Open Account
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
