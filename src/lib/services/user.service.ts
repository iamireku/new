
'use server';

import { 
  savedPaymentMethods,
  leaderboard,
  currentUser,
  PaymentMethod,
  LeaderboardUser,
  CurrentUser
} from '@/lib/data';

// This function simulates fetching saved payment methods.
// In the future, this will make an API call.
export async function getSavedPaymentMethods(): Promise<PaymentMethod[]> {
  // Deep copy to simulate immutable data from an API
  return JSON.parse(JSON.stringify(savedPaymentMethods));
}

// This function simulates fetching the current user's data.
// In the future, this will make an API call.
export async function getCurrentUser(): Promise<CurrentUser> {
  return JSON.parse(JSON.stringify(currentUser));
}

// This function simulates fetching leaderboard data.
// In the future, this will make an API call.
export async function getLeaderboard(): Promise<LeaderboardUser[]> {
  return JSON.parse(JSON.stringify(leaderboard));
}

