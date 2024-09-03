"use client"
import { useUserContext } from '@/context/userContext';
import Image from 'next/image';
import React, { useEffect } from 'react';



export const DevitCard = () => {

    const { userData, customerData, setUserData, setCustomerData } = useUserContext();


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
    }, [setUserData, setCustomerData]);

    const cus = customerData.find((c: any) => c.user === userData.id);
    
    const name = `${userData.first_name} ${userData.last_name}`

  return (
    <div className="">
      <div className="pb-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your Current Balance is: {cus?.balance} BDT
        </h2>
      </div>
    <div className='flex gap-8 flex-col lg:flex-row items-center'>
    <div className="w-96 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform">
      <img className="absolute inset-0 object-cover w-full h-full rounded-xl" src="/image/blue-card.png" alt="Card Image" width={384} height={224} />
      <div className="absolute top-8 left-0 w-full px-4">
        <div className="flex justify-between">
          <div>
            <p className="font-light text-sm">Name</p>
            <p className="font-medium tracking-widest text-lg">{name}</p>
          </div>
          <Image className="w-14 h-14" src="/image/card-icon.png" alt="Logo" width={56} height={56} />
        </div>
        <div className="pt-1">
          <p className="font-light text-sm">Card Number</p>
          <p className="font-medium tracking-wider text-lg">{cus?.account_no}</p>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex justify-between">
            <div>
              <p className="font-light text-xs">Valid</p>
              <p className="font-medium tracking-wider text-sm">31-12-25</p>
            </div>
            <div>
              <p className="font-light text-xs">Expiry</p>
              <p className="font-medium tracking-wider text-sm">31-12-25</p>
            </div>
            <div>
              <p className="font-light text-xs">CVV</p>
              <p className="font-bold tracking-wider text-sm">123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-96 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform">
      <img className="absolute inset-0 object-cover w-full h-full rounded-xl" src="/image/card-yellow.png" alt="Card Image" width={384} height={224} />
      <div className="absolute top-8 left-0 w-full px-4">
        <div className="flex justify-between">
          <div>
            <p className="font-light text-sm">Name</p>
            <p className="font-medium tracking-widest text-lg">{name}</p>
          </div>
          <Image className="w-14 h-14" src="/image/card-icon.png" alt="Logo" width={56} height={56} />
        </div>
        <div className="pt-1">
          <p className="font-light text-sm">Card Number</p>
          <p className="font-medium tracking-wider text-lg">{cus?.account_no}</p>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex justify-between">
            <div>
              <p className="font-light text-xs">Valid</p>
              <p className="font-medium tracking-wider text-sm">31-12-25</p>
            </div>
            <div>
              <p className="font-light text-xs">Expiry</p>
              <p className="font-medium tracking-wider text-sm">31-12-25</p>
            </div>
            <div>
              <p className="font-light text-xs">CVV</p>
              <p className="font-bold tracking-wider text-sm">123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};



