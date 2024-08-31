// import axios from 'axios';
// import { useMutation, useQuery, useQueryClient } from 'react-query';

// // Define API base URL
// const API_URL = 'http://127.0.0.1:8000/api';

// // Create an Axios instance with default configurations
// const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Define interfaces
// export interface UserData {
//   id: number;
//   email: string;
//   first_name: string;
//   last_name: string;
// }

// // Fetch user data with token
// export const fetchUserData = async (token: string | null) => {
//   if (!token) throw new Error('No token provided');
  
//   const response = await apiClient.get<UserData>('/auth/update-profile/', {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });
//   return response.data;
// };

// // Fetch transactions with token
// export const fetchTransactions = async (token: string | null) => {
//   if (!token) throw new Error('No token provided');

//   const response = await apiClient.get('transactions/', {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });
//   return response.data;
// };

// // Request a loan
// export const requestLoan = async (loanData: object) => {
//   const response = await apiClient.post('loan/request/', loanData);
//   return response.data;
// };

// // Approve a loan
// export const approveLoan = async (loanId: number) => {
//   const response = await apiClient.post(`loan/approve/${loanId}/`);
//   return response.data;
// };

// // React Query hooks
// export const useFetchUserData = (token: string | null) =>
//   useQuery('userData', () => fetchUserData(token), {
//     enabled: !!token, // Only fetch if token exists
//   });

// export const useFetchTransactions = (token: string | null) =>
//   useQuery('transactions', () => fetchTransactions(token), {
//     enabled: !!token, // Only fetch if token exists
//   });

// export const useRequestLoan = () => {
//   const queryClient = useQueryClient();
//   return useMutation(requestLoan, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('transactions');
//     },
//   });
// };

// export const useApproveLoan = () => {
//   const queryClient = useQueryClient();
//   return useMutation(approveLoan, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('transactions');
//     },
//   });
// };

// // Fetch normal user data with token
// export const fetchNormalUserData = async (token: string | null) => {
//   if (!token) throw new Error('No token provided');

//   const response = await apiClient.get<any>('/account/normalUser/', {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });
//   return response.data;
// };

// // Fetch admin user data with token
// export const fetchAdminUserData = async (token: string | null) => {
//   if (!token) throw new Error('No token provided');

//   const response = await apiClient.get<any>('/account/adminUser/', {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });
//   return response.data;
// };

// logic/apiService.ts
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Define API base URL
const API_URL = 'https://bank-management-backend.onrender.com/api';

// Create an Axios instance with default configurations
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define interfaces
export interface UserData {
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



// Fetch user data with token
export const fetchUserData = async (token: string | null) => {
  if (!token) throw new Error('No token provided');
  
  const response = await apiClient.get<UserData>('/auth/update-profile/', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

export const fetchServiceData = async () => {
  const response = await axios.get<Service>(`${API_URL}/services/`);
  return response.data;
};

// Fetch normal user data with token
export const fetchNormalUserData = async (token: string | null) => {
  if (!token) throw new Error('No token provided');

  const response = await apiClient.get<any>('/account/normalUser/', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

// Fetch admin user data with token
export const fetchAdminUserData = async (token: string | null) => {
  if (!token) throw new Error('No token provided');

  const response = await apiClient.get<any>('/account/adminUser/', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

// Fetch transactions with token
export const fetchTransactions = async (token: string | null) => {
  if (!token) throw new Error('No token provided');

  const response = await apiClient.get('transactions/', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

// Request a loan
export const requestLoan = async (loanData: object) => {
  const response = await apiClient.post('loan/request/', loanData);
  return response.data;
};

// Approve a loan
export const approveLoan = async (loanId: number) => {
  const response = await apiClient.post(`loan/approve/${loanId}/`);
  return response.data;
};

// React Query hooks
export const useFetchTransactions = (token: string | null) =>
  useQuery('transactions', () => fetchTransactions(token), {
    enabled: !!token, // Only fetch if token exists
  });

export const useRequestLoan = () => {
  const queryClient = useQueryClient();
  return useMutation(requestLoan, {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions');
    },
  });
};

export const useApproveLoan = () => {
  const queryClient = useQueryClient();
  return useMutation(approveLoan, {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions');
    },
  });
};