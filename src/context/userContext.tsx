"use client";
import { useContext, useState, createContext } from "react";



interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface NormalUserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface AdminUserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}
type Service = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type ContextProps ={
  userData: UserData;
  normalUserData: NormalUserData[];
  adminUserData: NormalUserData[];
  services: Service[];
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setAdminUserData: React.Dispatch<React.SetStateAction<NormalUserData[]>>;
  setNormalUserData: React.Dispatch<React.SetStateAction<NormalUserData[]>>;
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
  const [normalUserData, setNormalUserData] = useState<NormalUserData[]>([]);
  const [adminUserData, setAdminUserData] = useState<AdminUserData[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  return (
    <UserContext.Provider value={{ userData, normalUserData, adminUserData, setUserData, services, setNormalUserData, setAdminUserData, setServices }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };