"use client";
import { FC, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

// Define the Loan interface
interface Loan {
  id: number;
  amount: number;
  transaction_type: number;
  loan_approved: boolean;
  // Add other fields as necessary
}

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://bank-management-backend.onrender.com/api', // Base URL for your API
  headers: {
    'Content-Type': 'application/json',
  },
});

const ManagerDashboard: FC = () => {
  const queryClient = useQueryClient();
  const [authToken, setAuthToken] = useState<string | null>(null);

  // useEffect to set the auth token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      apiClient.defaults.headers['Authorization'] = `Token ${token}`;
    }
  }, []);

  // Fetch loans
  const fetchLoans = async () => {
    const response = await apiClient.get<Loan[]>('/transactions/loan/list/');
    return response.data;
  };

  const approveLoan = async (loanId: number) => {
    const response = await apiClient.post(`/transactions/approve-loan/${loanId}/`);
    return response.data;
  };

  const { data: loans, isLoading, isError } = useQuery(['loanList'], fetchLoans);

  const mutation = useMutation({
    mutationFn: (loanId: number) => approveLoan(loanId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['loanList']);
      alert(data.message);
    },
    onError: (error: any) => {
      alert('Error approving loan: ' + error.message);
    },
  });

  const handleApprove = (loanId: number) => {
    mutation.mutate(loanId);
  };

  if (isLoading) return <p>Loading loans...</p>;
  if (isError) return <p>Error loading loans</p>;

  return (
    <div>
      <h1>Loan Approval</h1>
      <ul>
        {loans?.map((loan) => (
          <li key={loan.id}>
            <p>Loan ID: {loan.id}</p>
            <p>Amount: ${loan.amount}</p>
            <p>Status: {loan.loan_approved ? 'Approved' : 'Pending'}</p>
            {!loan.loan_approved && (
              <button
                onClick={() => handleApprove(loan.id)}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? 'Approving...' : 'Approve Loan'}
              </button>
            )}
          </li>
        ))}
      </ul>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </div>
  );
};

export default ManagerDashboard;
