// /src/lib/services/wallet.service.ts
'use server';

import { 
  recentTransactions,
  Transaction
} from '@/lib/data';

// This function simulates fetching recent transactions for the dashboard and wallet history.
// In the future, this will make an API call.
export async function getRecentTransactions(): Promise<Transaction[]> {
  // Deep copy to simulate immutable data from an API
  return JSON.parse(JSON.stringify(recentTransactions));
}
