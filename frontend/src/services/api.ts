const API_BASE_URL = "http://localhost:8080/api";

export interface Account {
  accountId: number;
  userId: number;
  accountName: string;
  accountType: string;
  balance: number;
  currency: string;
}

export async function getAccounts(): Promise<Account[]> {
  const response = await fetch(`${API_BASE_URL}/accounts`);

  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }

  return response.json() as Promise<Account[]>;
}


export interface Transaction {
  transactionId: number;
  accountId: number;
  transactionType: string;
  description: string;
  amount: number;
  transactionDate: string;
  category: string;
  status: string;
}

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${API_BASE_URL}/transactions`);

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return response.json() as Promise<Transaction[]>;
}
