// /src/lib/services/wallet.service.ts
// /src/lib/services/wallet.service.ts
'use server';

import { 
  walletTransactions,
  recentTransactions,
  WalletTransaction,
  Transaction
} from '@/lib/data';

// This function simulates fetching wallet transaction history.
// In the future, this will make an API call.
export async function getWalletTransactions(): Promise<WalletTransaction[]> {
  // Deep copy to simulate immutable data from an API
  return JSON.parse(JSON.stringify(walletTransactions));
}

// This function simulates fetching recent transactions for the dashboard.
// In the future, this will make an API call.
export async function getRecentTransactions(): Promise<Transaction[]> {
  // Deep copy to simulate immutable data from an API
  return JSON.parse(JSON.stringify(recentTransactions));
}
