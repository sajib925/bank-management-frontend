"use client";
import { useContext, useState, createContext } from "react";



interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}


interface CustomerData {
  id: number;
  user: number;
  balance: string;
  mobile_no: string;
  nid: string;
  age: string;
  monthly_income: string;
  account_no: string;
  image: string;
  account_type : string;

}


interface ManagerData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  image : string;
  user: number;
}
type Service = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type ContextProps ={
  userData: UserData;
  customerData: CustomerData[];
  managerData: ManagerData[];
  services: Service[];
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setManagerData: React.Dispatch<React.SetStateAction<ManagerData[]>>;
  setCustomerData: React.Dispatch<React.SetStateAction<CustomerData[]>>;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const UserContext = createContext<ContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
  });
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [managerData, setManagerData] = useState<ManagerData[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  return (
    <UserContext.Provider value={{ userData, customerData, managerData,  services, setUserData, setCustomerData, setManagerData, setServices }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };