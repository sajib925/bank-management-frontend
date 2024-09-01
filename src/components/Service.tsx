"use client";
import { useUserContext } from "@/context/userContext";
import { fetchServiceData } from "@/logic/apiService";
import Image from "next/image";
import { useEffect } from "react";



export const Service = () => {

  const {services, setServices} = useUserContext()
  useEffect(() => {
    const servicesData = async () => {
        const service = await fetchServiceData()
        setServices(Array.isArray(service) ? service : [service]);
    }
    servicesData()
  },[])

  return (
    <div className="py-10 lg:py-20 px-5">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="mb-6 md:mb-20 max-w-[700px] mx-auto">
            <span className="subTitle text-center block">
              SERVICES
            </span>
            <h2 className="title text-center">
              Explore Our Range of Essential Services
            </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => (
            <div className="rounded overflow-hidden shadow-lg mx-auto w-full flex flex-col h-full" key={idx}>
              <Image
                className="w-full md:h-[250px]"
                src={item.image}
                alt={item.name}
                width={350}
                height={250}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-600 text-base">
                 {item.description}
                </p>
              </div>
              <div className="px-6 py-4 mt-auto flex items-center flex-wrap gap-2">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">
                  #SAVINGS
                </span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 ">
                  #CHECKING
                </span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">
                  #BUSINESS
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};